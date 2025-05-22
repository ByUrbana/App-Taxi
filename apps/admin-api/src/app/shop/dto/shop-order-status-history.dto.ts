import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopOrderStatus } from '@urbana/database/shop/enums/shop-order-status.enum';
import { ShopOrderCartDTO } from './shop-order-cart.dto';

@ObjectType('ShopOrderStatusHistory')
@Relation('orderCart', () => ShopOrderCartDTO)
export class ShopOrderStatusHistoryDTO {
  @IDField(() => ID)
  id: number;
  status: ShopOrderStatus;
  expectedBy?: Date;
  updatedAt?: Date;
  @FilterableField(() => ID)
  orderId!: number;
}
