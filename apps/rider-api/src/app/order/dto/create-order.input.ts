import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { PaymentMode } from '@urbana/database/enums/payment-mode.enum';
import { TaxiOrderType } from '@urbana/database/taxi/enums/taxi-order-type.enum';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  serviceId!: number;
  @Field(() => TaxiOrderType, { defaultValue: TaxiOrderType.Ride })
  orderType!: TaxiOrderType;
  points!: Point[];
  addresses!: string[];
  @Field(() => Int)
  intervalMinutes!: number;
  twoWay?: boolean;
  @Field(() => Int)
  waitTime?: number;
  optionIds?: string[];
  couponCode?: string;
  paymentMode?: PaymentMode;
  @Field(() => ID, { nullable: true })
  paymentMethodId?: number;
}
