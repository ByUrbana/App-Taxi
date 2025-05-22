import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { OrderStatus } from '@urbana/database/enums/order-status.enum';
import { UserContext } from '../../auth/authenticated-user';
import { RiderDTO } from './rider.dto';
import { ServiceDTO } from '../../service/dto/service.dto';
import { OrderMessageDTO } from '../../chat/dto/order-message.dto';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { ServiceOptionDTO } from './service-option.dto';
import { PaymentGatewayDTO } from '../../wallet/dto/payment-gateway.dto';
import { SavedPaymentMethodDto } from '../../wallet/dto/saved-payment-method.dto';
import { PaymentMode } from '@urbana/database/enums/payment-mode.enum';
import { TaxiOrderType } from '@urbana/database/taxi/enums/taxi-order-type.enum';
import { DeliveryContactDTO } from '../../core/fragments/delivery-contact.dto';

@ObjectType('Order')
@Authorize({
  authorize: (context: UserContext) =>
    ({ driverId: { eq: context.req.user.id } }) as unknown,
})
@Relation('driver', () => DriverDTO, {
  nullable: true,
})
@Relation('rider', () => RiderDTO, {
  nullable: true,
})
@Relation('service', () => ServiceDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, {
  nullable: true,
})
@Relation('savedPaymentMethod', () => SavedPaymentMethodDto, {
  nullable: true,
})
@UnPagedRelation('options', () => ServiceOptionDTO)
@UnPagedRelation('conversation', () => OrderMessageDTO, {
  relationName: 'conversation',
})
export class OrderDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => OrderStatus)
  status: OrderStatus;
  type: TaxiOrderType;
  @FilterableField()
  createdOn: Date;
  @FilterableField(() => Int)
  distanceBest!: number;
  @Field(() => Int)
  durationBest!: number;
  startTimestamp?: Date;
  finishTimestamp?: Date;
  etaPickup?: Date;
  waitMinutes!: number;
  waitCost!: number;
  rideOptionsCost!: number;
  taxCost!: number;
  serviceCost!: number;
  @Field(() => Int)
  destinationArrivedTo!: number;
  driverLastSeenMessagesAt!: Date;
  riderLastSeenMessagesAt!: Date;
  senderContact?: DeliveryContactDTO;
  receiverContact?: DeliveryContactDTO;
  expectedTimestamp: Date;
  @FilterableField()
  costBest: number;
  costAfterCoupon: number;
  providerShare: number;
  paidAmount: number;
  currency!: string;
  @FilterableField(() => ID, { filterOnly: true })
  driverId?: number;
  addresses: string[];
  points: Point[];
  tipAmount!: number;
  paymentMode?: PaymentMode;
  @FilterableField(() => ID, { nullable: true })
  paymentGatewayId?: number;
  @FilterableField(() => ID, { nullable: true })
  paymentMethodId?: number;
  directions?: Point[];
  driverDirections?: Point[];
}
