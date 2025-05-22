import { ID, ObjectType } from '@nestjs/graphql';
import {
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { ShopTransactionDTO } from '../../../../shop/dto/shop-transaction.dto';

@ObjectType('ShopPayoutSessionPayoutMethodDetail')
@Relation('payoutMethod', () => PayoutMethodDTO)
@OffsetConnection('shopTransactions', () => ShopTransactionDTO, {
  enableAggregate: true,
})
export class ShopPayoutSessionPayoutMethodDetailDTO {
  @IDField(() => ID)
  id: number;

  status: PayoutSessionStatus;
}
