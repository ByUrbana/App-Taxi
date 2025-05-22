import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { TransactionType } from '@urbana/database/enums/transaction-type.enum';
import { ShopTransactionCreditType } from '@urbana/database/shop/enums/shop-transaction-credit-type.enum';
import { ShopTransactionDebitType } from '@urbana/database/shop/enums/shop-transaction-debit-type.enum';
import { ShopDTO } from './shop.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { PayoutMethodDTO } from '../../payout/dto/payout-method.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { AppType } from '@urbana/database/enums/app-type.enum';

@ObjectType('ShopTransaction')
@Relation('staff', () => OperatorDTO, { nullable: true })
@Relation('payoutAccount', () => PayoutAccountDTO, {
  nullable: true,
})
@FilterableRelation('payoutMethod', () => PayoutMethodDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('shop', () => ShopDTO)
export class ShopTransactionDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => ID)
  shopId: number;
  @FilterableField(() => TransactionStatus)
  status: TransactionStatus;
  createdAt: Date;
  transactionDate: Date;
  @FilterableField(() => AppType)
  appType: AppType;
  @FilterableField(() => TransactionType)
  type: TransactionType;
  @FilterableField(() => ShopTransactionDebitType)
  debitType?: ShopTransactionDebitType;
  @FilterableField(() => ShopTransactionCreditType)
  creditType?: ShopTransactionCreditType;
  @FilterableField()
  currency: string;
  @FilterableField()
  amount: number;
  documentNumber?: string;
  description?: string;
  @FilterableField(() => ID)
  payoutSessionId?: number;
  @FilterableField(() => ID)
  payoutAccountId?: number;
  @FilterableField(() => ID)
  payoutMethodId?: number;
  @FilterableField(() => ID)
  payoutSessionMethodId?: number;
}
