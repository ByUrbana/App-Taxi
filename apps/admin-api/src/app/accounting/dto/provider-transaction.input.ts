import { Field, ID, InputType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField,
} from '@ptc-org/nestjs-query-graphql';
import { ProviderDeductTransactionType } from '@urbana/database/enums/provider-deduct-transaction-type.enum';
import { ProviderExpenseType } from '@urbana/database/enums/provider-expense-type.enum';
import { ProviderRechargeTransactionType } from '@urbana/database/enums/provider-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { UserContext } from '../../auth/authenticated-admin';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<ProviderTransactionInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, operatorId: context.req.user.id } };
  },
)
export class ProviderTransactionInput {
  @Field(() => TransactionAction)
  action: TransactionAction;
  @Field(() => ProviderDeductTransactionType)
  deductType?: ProviderDeductTransactionType;
  @Field(() => ProviderRechargeTransactionType)
  rechargeType?: ProviderRechargeTransactionType;
  @Field(() => ProviderExpenseType)
  expenseType?: ProviderExpenseType;
  amount: number;
  currency: string;
  refrenceNumber?: string;
  description?: string;
  @FilterableField(() => ID)
  operatorId?: number;
}
