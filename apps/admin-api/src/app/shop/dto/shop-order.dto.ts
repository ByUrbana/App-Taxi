import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopOrderCartDTO } from './shop-order-cart.dto';
import { PaymentMode } from '@urbana/database/enums/payment-mode.enum';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { ShopOrderStatus } from '@urbana/database/shop/enums/shop-order-status.enum';
import { AddressDTO } from '../../address/dto/address.dto';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { DriverTransactionDTO } from '../../driver/dto/driver-transaction.dto';
import { RiderTransactionDTO } from '../../customer/dto/rider-transaction.dto';
import { ShopOrderStatusHistoryDTO } from './shop-order-status-history.dto';
import { DeliveryMethod } from '@urbana/database/shop/enums/delivery-method.enum';
import { Point } from '@urbana/database';

@ObjectType('ShopOrder')
@FilterableUnPagedRelation('carts', () => ShopOrderCartDTO)
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('deliveryAddress', () => AddressDTO)
@Relation('customer', () => CustomerDTO)
@UnPagedRelation('riderTransactions', () => RiderTransactionDTO)
@UnPagedRelation('driverTransactions', () => DriverTransactionDTO)
@UnPagedRelation('statusHistories', () => ShopOrderStatusHistoryDTO)
export class ShopOrderDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  createdAt: Date;
  @FilterableField(() => ShopOrderStatus)
  status: ShopOrderStatus;
  subTotal: number;
  @FilterableField()
  currency: string;
  deliveryFee: number;
  @FilterableField(() => DeliveryMethod)
  deliveryMethod: DeliveryMethod;
  @Field(() => [Point], { nullable: true })
  deliveryDirections?: Point[];
  @FilterableField(() => PaymentMode)
  paymentMethod: PaymentMode;
  @FilterableField(() => ID)
  customerId: number;
  tax: number;
  discount: number;
  serviceFee: number;
  @FilterableField(() => Float)
  total: number;
  estimatedDeliveryTime?: Date;
  fullfillmentTime?: Date;
}
