import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ShopOrderDTO } from '../../../dto/shop-order.dto';
import { OperatorDTO } from '../../../../operator/dto/operator.dto';
import { ComplaintStatus } from '@urbana/database/enums/complaint-status.enum';
import { ShopSupportRequestActivityDTO } from './shop-support-request-activity.dto';
import { ShopOrderCartDTO } from '../../../dto/shop-order-cart.dto';

@ObjectType('ShopSupportRequest')
@FilterableRelation('order', () => ShopOrderDTO)
@Relation('cart', () => ShopOrderCartDTO, { nullable: true })
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
@UnPagedRelation('activities', () => ShopSupportRequestActivityDTO)
export class ShopSupportRequestDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  @FilterableField(() => Boolean)
  requestedByShop: boolean;
  subject: string;
  content?: string;
  @FilterableField(() => ComplaintStatus)
  status: ComplaintStatus;
  @FilterableField(() => ID, { filterOnly: true })
  orderId: number;
  @FilterableField(() => ID, { nullable: true, filterOnly: true })
  cartId?: number;
}
