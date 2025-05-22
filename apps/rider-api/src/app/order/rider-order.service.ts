import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverDeductTransactionType } from '@urbana/database/enums/driver-deduct-transaction-type.enum';
import { DriverStatus } from '@urbana/database/enums/driver-status.enum';
import { OrderStatus } from '@urbana/database/enums/order-status.enum';
import { PaymentStatus } from '@urbana/database/enums/payment-status.enum';
import { ProviderRechargeTransactionType } from '@urbana/database/enums/provider-recharge-transaction-type.enum';
import { RequestActivityType } from '@urbana/database/enums/request-activity-type.enum';
import { RiderDeductTransactionType } from '@urbana/database/enums/rider-deduct-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { FeedbackEntity } from '@urbana/database/taxi/feedback.entity';
import { PaymentEntity } from '@urbana/database/payment.entity';
import { RequestActivityEntity } from '@urbana/database/taxi/request-activity.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { DriverNotificationService } from '@urbana/order/firebase-notification-service/driver-notification.service';
import { SharedDriverService } from '@urbana/order/shared-driver.service';
import { SharedProviderService } from '@urbana/order/shared-provider.service';
import { SharedRiderService } from '@urbana/order/shared-rider.service';
import { OrderRedisService } from '@urbana/redis/order-redis.service';
import { ForbiddenError } from '@nestjs/apollo';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { firstValueFrom } from 'rxjs';
import { In, Repository } from 'typeorm';

import { SubmitFeedbackInput } from './dto/submit-feedback.input';
import { SharedCustomerWalletService } from '@urbana/customer-wallet';
import { CurrentOrder } from './dto/current-order.dto';
import { DriverRedisService } from '@urbana/redis/driver-redis.service';
import { Point } from '@urbana/database';

const activeOrderStatuses = [
  OrderStatus.Requested,
  OrderStatus.Found,
  OrderStatus.NotFound,
  OrderStatus.NoCloseFound,
  OrderStatus.DriverAccepted,
  OrderStatus.Arrived,
  OrderStatus.Started,
  OrderStatus.WaitingForReview,
  OrderStatus.WaitingForPrePay,
  OrderStatus.WaitingForPostPay,
];

@Injectable()
export class RiderOrderService {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    private orderRepository: Repository<TaxiOrderEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepo: Repository<PaymentEntity>,
    private riderService: SharedRiderService,
    private driverService: SharedDriverService,
    private orderRedisService: OrderRedisService,
    private driverRedisService: DriverRedisService,
    private providerService: SharedProviderService,
    private driverNotificationService: DriverNotificationService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    private httpService: HttpService,
    private readonly customerWalletService: SharedCustomerWalletService,
  ) {}

  async getCurrentOrder(
    riderId: number,
    relations: string[] = [],
  ): Promise<TaxiOrderEntity | null> {
    return this.orderRepository.findOne({
      where: {
        riderId,
        status: In(activeOrderStatuses),
      },
      order: { id: 'DESC' },
      relations,
    });
  }

  async getLastOrder(riderId: number, relations: string[] = []) {
    return this.orderRepository.findOne({
      where: { riderId },
      order: { id: 'DESC' },
      relations,
    });
  }

  async cancelRiderLastOrder(input: {
    riderId: number;
    reasonId?: number;
    reason?: string;
  }) {
    const order = await this.getCurrentOrder(input.riderId);
    return this.cancelOrder({
      orderId: order.id,
      reasonId: input.reasonId,
      reason: input.reason,
    });
  }

  async cancelOrder(input: {
    orderId: number;
    reasonId?: number;
    reason?: string;
  }): Promise<TaxiOrderEntity> {
    await this.orderRepository.update(input.orderId, {
      status: OrderStatus.RiderCanceled,
      finishTimestamp: new Date(),
      costAfterCoupon: 0,
      cancelReasonId: input.reasonId,
      cancelReasonNote: input.reason,
    });
    const order = await this.orderRepository.findOneOrFail({
      where: { id: input.orderId },
      relations: ['service', 'driver', 'rider'],
    });
    const payments = await this.paymentRepo.find({
      where: {
        userType: 'client',
        userId: order.riderId.toString(),
        status: PaymentStatus.Authorized,
        orderNumber: order.id.toString(),
      },
      order: { amount: 'DESC' },
    });
    if (order.driverId != null && order.service.cancellationTotalFee > 0) {
      const riderCredit =
        await this.customerWalletService.getRiderCreditInCurrency(
          order.riderId,
          order.currency,
        );
      if (riderCredit < order.service.cancellationTotalFee) {
        await firstValueFrom(
          this.httpService.get<{ status: 'OK' | 'FAILED' }>(
            `${process.env.GATEWAY_SERVER_URL}/capture?id=${payments[0].transactionNumber}&amount=${order.service.cancellationTotalFee}`,
          ),
        );
      }
      await Promise.all([
        this.customerWalletService.rechargeWallet({
          action: TransactionAction.Deduct,
          deductType: RiderDeductTransactionType.OrderFee,
          amount: -order.service.cancellationTotalFee,
          currency: order.currency,
          riderId: order.riderId,
          status: TransactionStatus.Done,
        }),
        this.driverService.rechargeWallet({
          action: TransactionAction.Deduct,
          deductType: DriverDeductTransactionType.Commission,
          amount: order.service.cancellationDriverShare,
          currency: order.currency,
          driverId: order.driverId,
          status: TransactionStatus.Done,
        }),
        this.providerService.rechargeWallet({
          action: TransactionAction.Recharge,
          rechargeType: ProviderRechargeTransactionType.Commission,
          amount:
            order.service.cancellationTotalFee -
            order.service.cancellationDriverShare,
          currency: order.currency,
        }),
      ]);
    }
    for (const payment of payments) {
      await firstValueFrom(
        this.httpService.get<{ status: 'OK' | 'FAILED' }>(
          `${process.env.GATEWAY_SERVER_URL}/cancel_preauth?id=${payment.transactionNumber}`,
        ),
      );
    }
    if (order.driverId == null) {
      this.pubSub.publish('orderRemoved', { orderRemoved: order });
      this.orderRedisService.expire([order.id]);
    } else {
      this.driverNotificationService.canceled(order.driver);
      await this.driverService.updateDriverStatus(
        order.driverId,
        DriverStatus.Online,
      );
      Logger.log(`publishing orderUpdated`);
      this.pubSub.publish('orderUpdated', { orderUpdated: order });
    }
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.CanceledByRider,
    });
    return order;
  }

  async submitReview(
    riderId: number,
    review: SubmitFeedbackInput,
  ): Promise<TaxiOrderEntity> {
    let order = await this.orderRepository.findOneBy({ id: review.requestId });
    if (order.riderId != riderId) {
      throw new ForbiddenError('Not Allowed');
    }
    const previousReview = await this.feedbackRepository.findOne({
      where: { requestId: order.id },
    });
    if (previousReview != null) {
      await this.feedbackRepository.delete(previousReview.id);
    }
    // if (order.reviewId != null) {
    //   await this.feedbackRepository.delete(order.reviewId!);
    // }
    review.score = review.score > 5 ? review.score : review.score * 20;
    await this.feedbackRepository.save({
      ...review,
      driverId: order.driverId,
      requestId: order.id,
      parameters: (review.parameterIds ?? []).map((id) => ({ id })),
    });
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.Reviewed,
    });
    const reviews = await this.feedbackRepository.find({
      where: { driverId: order.driverId },
    });
    const averageRating = Math.round(
      reviews.reduce((total, next) => total + next.score, 0) / reviews.length,
    );
    await this.driverService.setRating(
      order.driverId,
      averageRating,
      reviews.length,
    );
    if (review.addToFavorite == true) {
      await this.riderService.addDriverToFavoriteList({
        riderId,
        driverId: order.driverId,
      });
    }
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Finished,
    });
    order = await this.orderRepository.findOneBy({ id: review.requestId });
    return order;
  }

  async skipReview(userId: number) {
    const order = await this.getCurrentOrder(userId);
    if (order == null) {
      throw new ForbiddenError('Not Allowed');
    }
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Finished,
    });
    return order;
  }

  async getActiveOrders(id: number): Promise<CurrentOrder[]> {
    const orders = await this.orderRepository.find({
      where: {
        status: In(activeOrderStatuses),
        riderId: id,
      },
    });
    return Promise.all(
      orders.map(async (order) => {
        const currentOrder: {
          order: TaxiOrderEntity;
          driverLocation: Point;
        } = {
          order: order,
          driverLocation:
            order.driverId == null
              ? null
              : await this.driverRedisService.getDriverCoordinate(
                  order.driverId,
                ),
        };
        return currentOrder;
      }),
    );
  }
}
