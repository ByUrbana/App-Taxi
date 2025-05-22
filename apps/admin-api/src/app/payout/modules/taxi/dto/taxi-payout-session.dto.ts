import { ID, ObjectType } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';
import { TaxiPayoutSessionPayoutMethodDetailDTO } from './taxi-payout-session-payout-method-detail.dto';
import { DriverTransactionDTO } from '../../../../driver/dto/driver-transaction.dto';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { PayoutAuthorizer } from '../../../payout.authorizer';

@ObjectType('TaxiPayoutSession')
@OffsetConnection('driverTransactions', () => DriverTransactionDTO, {
  enableAggregate: true,
})
@UnPagedRelation(
  'payoutMethodDetails',
  () => TaxiPayoutSessionPayoutMethodDetailDTO,
)
@UnPagedRelation('payoutMethods', () => PayoutMethodDTO)
@Authorize(PayoutAuthorizer)
export class TaxiPayoutSessionDTO {
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
