import { ID, ObjectType } from '@nestjs/graphql';
import { IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { CartStatus } from '@urbana/database/shop/enums/shop-order-cart-status.enum';
import { ShopDTO } from './shop.dto';

@ObjectType()
@Relation('shop', () => ShopDTO)
export class ShopOrderCartDTO {
  @IDField(() => ID)
  id: number;
  status: CartStatus;
}
