import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { ProviderDeductTransactionType } from '@urbana/database/enums/provider-deduct-transaction-type.enum';
import { ProviderRechargeTransactionType } from '@urbana/database/enums/provider-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';

@ObjectType('FleetTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
export class FleetTransactionDTO {
  @IDField(() => ID)
  id: number;
  transactionTimestamp!: Date;
  @FilterableField(() => TransactionStatus)
  status: TransactionStatus;
  @FilterableField(() => TransactionAction)
  action: TransactionAction;
  @FilterableField(() => ProviderDeductTransactionType, { nullable: true })
  deductType?: ProviderDeductTransactionType;
  @FilterableField(() => ProviderRechargeTransactionType, { nullable: true })
  rechargeType?: ProviderRechargeTransactionType;
  amount: number;
  currency: string;
  refrenceNumber?: string;
  description?: string;
  @FilterableField(() => ID)
  operatorId?: number;
  @FilterableField(() => ID)
  requestId?: number;
  @FilterableField(() => ID)
  fleetId: number;
}
