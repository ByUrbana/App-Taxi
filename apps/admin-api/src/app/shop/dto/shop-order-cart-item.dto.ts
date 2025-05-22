import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ItemVariantDTO } from './item-variant.dto';
import { ItemOptionDTO } from './item-option.dto';

@ObjectType('ShopOrderCartItem')
@Relation('itemVariant', () => ItemVariantDTO)
@UnPagedRelation('options', () => ItemOptionDTO)
export class ShopOrderCartItemDTO {
  @IDField(() => ID)
  id: number;
  priceEach: number;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  canceledQuantity: number;
}
