import { ID, ObjectType } from '@nestjs/graphql';
import {
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { DriverTransactionDTO } from '../../../../driver/dto/driver-transaction.dto';

@ObjectType('TaxiPayoutSessionPayoutMethodDetail')
@Relation('payoutMethod', () => PayoutMethodDTO)
@OffsetConnection('driverTransactions', () => DriverTransactionDTO, {
  enableAggregate: true,
})
export class TaxiPayoutSessionPayoutMethodDetailDTO {
  @IDField(() => ID)
  id: number;

  status: PayoutSessionStatus;
}
