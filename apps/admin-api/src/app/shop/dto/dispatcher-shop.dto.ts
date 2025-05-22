import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ShopDTO } from './shop.dto';

@ObjectType('DispatcherShop')
export class DispatcherShopDTO extends ShopDTO {
  deliveryFee!: number;
  @Field(() => Int)
  minDeliveryTime!: number;
  @Field(() => Int)
  maxDeliveryTime!: number;
  minimumOrderAmount!: number;
  // @Field(() => RatingAggregateDTO)
  // ratingAggregate!: RatingAggregateDTO;
}
