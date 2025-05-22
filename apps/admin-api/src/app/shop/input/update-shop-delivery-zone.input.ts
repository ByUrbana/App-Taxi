import { Field, InputType, Int } from '@nestjs/graphql';
import { Point } from '@urbana/database';

@InputType()
export class UpdateShopDeliveryZoneInput {
  name?: string;
  deliveryFee?: number;
  @Field(() => Int)
  minDeliveryTimeMinutes?: number;
  @Field(() => Int)
  maxDeliveryTimeMinutes?: number;
  minimumOrderAmount?: number;
  location?: Point[][];
  enabled?: boolean;
}
