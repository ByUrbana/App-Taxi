import { ID, ObjectType } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';
import { ShopPayoutSessionPayoutMethodDetailDTO } from './shop-payout-session-payout-method-detail.dto';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { PayoutAuthorizer } from '../../../payout.authorizer';
import { ShopTransactionDTO } from '../../../../shop/dto/shop-transaction.dto';

@ObjectType('ShopPayoutSession')
@OffsetConnection('shopTransactions', () => ShopTransactionDTO, {
  enableAggregate: true,
})
@UnPagedRelation(
  'payoutMethodDetails',
  () => ShopPayoutSessionPayoutMethodDetailDTO,
)
@UnPagedRelation('payoutMethods', () => PayoutMethodDTO)
@Authorize(PayoutAuthorizer)
export class ShopPayoutSessionDTO {
  @IDField(() => ID)
  id!: number;
  createdAt!: Date;
  processedAt?: Date;
  description?: string;
  @FilterableField(() => PayoutSessionStatus)
  status!: PayoutSessionStatus;
  @FilterableField()
  totalAmount!: number;
  @FilterableField()
  currency!: string;
}
