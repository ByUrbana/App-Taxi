import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { ProviderDeductTransactionType } from '@urbana/database/enums/provider-deduct-transaction-type.enum';
import { ProviderRechargeTransactionType } from '@urbana/database/enums/provider-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { ProviderExpenseType } from '@urbana/database/enums/provider-expense-type.enum';

@ObjectType('ProviderTransaction')
export class ProviderTransactionDTO {
  @IDField(() => ID)
  id: number;
  createdAt!: Date;
  @FilterableField(() => TransactionAction)
  action: TransactionAction;
  @FilterableField(() => ProviderDeductTransactionType)
  deductType?: ProviderDeductTransactionType;
  @FilterableField(() => ProviderRechargeTransactionType)
  rechargeType?: ProviderRechargeTransactionType;
  @FilterableField(() => ProviderExpenseType)
  expenseType?: ProviderExpenseType;
  @FilterableField()
  amount: number;
  @FilterableField()
  currency: string;
  refrenceNumber?: string;
  description?: string;
  @FilterableField(() => ID)
  operatorId?: number;
  @FilterableField(() => ID, { name: 'requestId' })
  taxiOrderId?: number;
  @FilterableField(() => ID)
  parkOrderId?: number;
  @FilterableField(() => ID)
  shopOrderCartId?: number;
}
