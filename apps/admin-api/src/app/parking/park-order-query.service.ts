import { DeepPartial, QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { ParkOrderEntity } from '@urbana/database/parking/park-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMode } from '@urbana/database/enums/payment-mode.enum';
import { ParkOrderDTO } from './dto/park-order.dto';
import { CreateParkOrderInput } from './dto/create-park-order.input';
import { ParkingCustomerNotificationEntity } from '@urbana/database/parking/parking-customer-notification.entity';
import { ParkingCustomerNotificationType } from '@urbana/database/parking/enums/parking-customer-notification-type.enum';
import { ParkSpotEntity } from '@urbana/database/parking/park-spot.entity';

@QueryService(ParkOrderDTO)
export class ParkOrderQueryService extends TypeOrmQueryService<ParkOrderDTO> {
  constructor(
    @InjectRepository(ParkOrderEntity)
    readonly repo: Repository<ParkOrderEntity>,
    @InjectRepository(ParkingCustomerNotificationEntity)
    readonly notificationRepo: Repository<ParkingCustomerNotificationEntity>,
    @InjectRepository(ParkSpotEntity)
    readonly parkSpotRepo: Repository<ParkSpotEntity>,
  ) {
    super(repo);
  }

  override async createOne(
    record: CreateParkOrderInput,
  ): Promise<ParkOrderDTO> {
    const { paymentMethodId, ..._order } = record;
    const order: DeepPartial<ParkOrderEntity> = _order;
    if (order.paymentMode === PaymentMode.SavedPaymentMethod) {
      order.savedPaymentMethodId = paymentMethodId;
    } else if (order.paymentMode === PaymentMode.PaymentGateway) {
      order.paymentGatewayId = paymentMethodId;
    }
    await this.notificationRepo.save({
      type: ParkingCustomerNotificationType.booked,
      parkOrderId: order.id,
      customerId: order.carOwnerId,
    });
    const parkSpot = await this.parkSpotRepo.findOneByOrFail({
      id: _order.parkSpotId,
    });
    order.spotOwnerId = parkSpot.ownerId;
    return super.createOne(order);
  }
}
