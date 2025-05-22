import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { Point } from '@urbana/database';

@ObjectType('ShopDeliveryZone')
export class ShopDeliveryZoneDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => ID)
  shopId: number;
  @FilterableField()
  name?: string;
  @FilterableField()
  deliveryFee: number;
  @Field(() => Int)
  minDeliveryTimeMinutes: number;
  @Field(() => Int)
  maxDeliveryTimeMinutes: number;

  minimumOrderAmount: number;
  @FilterableField()
  enabled: boolean;
  location: Point[][];
}
