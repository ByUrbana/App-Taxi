import { ID, ObjectType } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';
import { ParkingPayoutSessionPayoutMethodDetailDTO } from './parking-payout-session-payout-method-detail.dto';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { PayoutAuthorizer } from '../../../payout.authorizer';
import { ParkingTransactionDTO } from '../../../../parking/dto/parking-transaction.dto';

@ObjectType('ParkingPayoutSession')
@OffsetConnection('parkingTransactions', () => ParkingTransactionDTO, {
  enableAggregate: true,
})
@UnPagedRelation(
  'payoutMethodDetails',
  () => ParkingPayoutSessionPayoutMethodDetailDTO,
)
@UnPagedRelation('payoutMethods', () => PayoutMethodDTO)
@Authorize(PayoutAuthorizer)
export class ParkingPayoutSessionDTO {
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
