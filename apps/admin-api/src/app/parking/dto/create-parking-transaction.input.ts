import { Field, ID, InputType } from '@nestjs/graphql';
import { TransactionType } from '@urbana/database/enums/transaction-type.enum';
import { ParkingTransactionCreditType } from '@urbana/database/parking/enums/parking-transaction-credit-type.enum';
import { ParkingTransactionDebitType } from '@urbana/database/parking/enums/parking-transaction-debit-type.enum';

@InputType()
export class CreateParkingTransactionInput {
  transactionDate?: Date;
  type: TransactionType;
  debitType?: ParkingTransactionDebitType;
  creditType?: ParkingTransactionCreditType;
  amount: number;
  currency: string;
  documentNumber?: string;
  @Field(() => ID)
  customerId!: number;
  description?: string;
}
