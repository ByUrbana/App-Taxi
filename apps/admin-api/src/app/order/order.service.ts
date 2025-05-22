import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from '@urbana/database/enums/order-status.enum';
import { RequestActivityType } from '@urbana/database/enums/request-activity-type.enum';
import { RequestActivityEntity } from '@urbana/database/taxi/request-activity.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { OrderRedisService } from '@urbana/redis/order-redis.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Between, Repository } from 'typeorm';
import { TaxiOrderNoteDTO } from './dto/taxi-order-note.dto';
import { TaxiOrderNoteEntity } from '@urbana/database/taxi/taxi-order-note.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    private orderRepository: Repository<TaxiOrderEntity>,
    @InjectRepository(RequestActivityEntity)
    private activityRepository: Repository<RequestActivityEntity>,
    @InjectRepository(TaxiOrderNoteEntity)
    private orderNoteRepository: Repository<TaxiOrderNoteEntity>,
    private orderRedisService: OrderRedisService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
  ) {}

  async cancelOrder(orderId: number): Promise<TaxiOrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { service: true },
    });
    this.activityRepository.insert({
      requestId: order.id,
      type: RequestActivityType.CanceledByOperator,
    });
    await this.orderRepository.update(order.id, {
      status: OrderStatus.Expired,
      finishTimestamp: new Date(),
      costAfterCoupon: 0,
    });
    this.orderRedisService.expire([order.id]);
    this.pubSub.publish('orderRemoved', { orderRemoved: order });
    return order;
  }

  createTaxiOrderNote(input: {
    staffId: number;
    orderId: number;
    note: string;
  }): Promise<TaxiOrderNoteDTO> {
    this.orderNoteRepository.insert({
      orderId: input.orderId,
      note: input.note,
      staffId: input.staffId,
    });
    return this.orderNoteRepository.findOne({
      where: { orderId: input.orderId },
      relations: { staff: true },
    });
  }

  async getTaxiOrderSuccessRate(input: {
    startTime?: Date;
    endTime?: Date;
  }): Promise<number | null> {
    const countSuccess = await this.orderRepository.count({
      where: {
        expectedTimestamp:
          input.startTime || input.endTime == null
            ? null
            : Between(input.startTime, input.endTime),
        status: OrderStatus.Finished,
      },
    });
    const countAllOrders = await this.orderRepository.count({
      where: {
        expectedTimestamp:
          input.startTime || input.endTime == null
            ? null
            : Between(input.startTime, input.endTime),
      },
    });
    if (countAllOrders == 0) return null;
    return countSuccess / countAllOrders;
  }
}
