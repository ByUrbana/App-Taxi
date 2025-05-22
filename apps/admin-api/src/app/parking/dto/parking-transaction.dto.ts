import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { TransactionType } from '@urbana/database/enums/transaction-type.enum';
import { ParkingTransactionCreditType } from '@urbana/database/parking/enums/parking-transaction-credit-type.enum';
import { ParkingTransactionDebitType } from '@urbana/database/parking/enums/parking-transaction-debit-type.enum';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { PayoutMethodDTO } from '../../payout/dto/payout-method.dto';

@ObjectType('ParkingTransaction')
@Relation('staff', () => OperatorDTO, { nullable: true })
@Relation('payoutAccount', () => PayoutAccountDTO, {
  nullable: true,
})
@FilterableRelation('payoutMethod', () => PayoutMethodDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('customer', () => CustomerDTO)
export class ParkingTransactionDTO {
  @IDField(() => ID)
  id!: number;
  createdAt!: Date;
  transactionDate!: Date;
  @FilterableField(() => TransactionStatus)
  status!: TransactionStatus;
  @FilterableField(() => TransactionType)
  type!: TransactionType;
  @FilterableField(() => ParkingTransactionDebitType)
  debitType?: ParkingTransactionDebitType;
  @FilterableField(() => ParkingTransactionCreditType)
  creditType?: ParkingTransactionCreditType;
  @FilterableField()
  currency!: string;
  @FilterableField()
  amount!: number;
  documentNumber?: string;
  description?: string;
  @FilterableField(() => ID)
  customerId!: number;
  @FilterableField(() => ID)
  payoutSessionId?: number;
  @FilterableField(() => ID)
  payoutAccountId?: number;
  @FilterableField(() => ID)
  payoutMethodId?: number;
  @FilterableField(() => ID)
  payoutSessionMethodId?: number;
  @FilterableField(() => ID)
  parkSpotId?: number;
}
