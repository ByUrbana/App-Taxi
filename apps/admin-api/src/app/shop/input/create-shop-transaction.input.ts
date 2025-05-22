import { Field, ID, InputType } from '@nestjs/graphql';
import { TransactionType } from '@urbana/database/enums/transaction-type.enum';
import { ShopTransactionCreditType } from '@urbana/database/shop/enums/shop-transaction-credit-type.enum';
import { ShopTransactionDebitType } from '@urbana/database/shop/enums/shop-transaction-debit-type.enum';

@InputType()
export class CreateShopTransactionInput {
  transactionDate?: Date;
  type: TransactionType;
  debitType?: ShopTransactionDebitType;
  creditType?: ShopTransactionCreditType;
  amount: number;
  currency: string;
  documentNumber?: string;
  @Field(() => ID)
  shopId!: number;
  description?: string;
}
