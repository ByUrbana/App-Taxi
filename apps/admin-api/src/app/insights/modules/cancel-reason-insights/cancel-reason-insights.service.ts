import { Injectable } from '@nestjs/common';
import { NameCountDTO } from '../../core/dto/name-count.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderCancelReasonEntity } from '@urbana/database/taxi/order-cancel-reason.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { Repository } from 'typeorm';
import { UserTypeCountPairDTO } from '../../core/dto/user-type-count-pair.dto';

@Injectable()
export class CancelReasonInsightsService {
  constructor(
    @InjectRepository(OrderCancelReasonEntity)
    private readonly orderCancelReasonRepository: Repository<OrderCancelReasonEntity>,
    @InjectRepository(TaxiOrderEntity)
    private readonly taxiOrderRepository: Repository<TaxiOrderEntity>,
  ) {}

  async cancelReasonPopularityByName(): Promise<NameCountDTO[]> {
    const result = await this.taxiOrderRepository
      .createQueryBuilder('order')
      .select('order.cancelReasonId, COUNT(order.cancelReasonId) as count')
      .select('cancelReason.name', 'name')
      .leftJoin('order.cancelReason', 'cancelReason')
      .groupBy('order.cancelReasonId')
      .getRawMany();
    return result;
  }

  async cancelReasonPopularityByUserType(): Promise<UserTypeCountPairDTO[]> {
    const result = await this.taxiOrderRepository
      .createQueryBuilder('order')
      .select('order.cancelReasonId, COUNT(order.cancelReasonId) as count')
      .select('cancelReason.userType', 'userType')
      .groupBy('order.cancelReasonId')
      .getRawMany();
    return result;
  }
}
