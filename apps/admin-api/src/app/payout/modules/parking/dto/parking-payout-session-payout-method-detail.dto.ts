import { ID, ObjectType } from '@nestjs/graphql';
import {
  IDField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';
import { PayoutMethodDTO } from '../../../dto/payout-method.dto';
import { ParkingTransactionDTO } from '../../../../parking/dto/parking-transaction.dto';

@ObjectType('ParkingPayoutSessionPayoutMethodDetail')
@Relation('payoutMethod', () => PayoutMethodDTO)
@OffsetConnection('parkingTransactions', () => ParkingTransactionDTO, {
  enableAggregate: true,
})
export class ParkingPayoutSessionPayoutMethodDetailDTO {
  @IDField(() => ID)
  id: number;

  status: PayoutSessionStatus;
}
