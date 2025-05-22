import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Point } from '@urbana/database';

@InputType()
export class CreateShopDeliveryZoneInput {
  name?: string;
  @Field(() => ID)
  shopId: number;
  deliveryFee: number;
  @Field(() => Int)
  minDeliveryTimeMinutes: number;
  @Field(() => Int)
  maxDeliveryTimeMinutes: number;
  minimumOrderAmount: number;
  location: Point[][];
}
