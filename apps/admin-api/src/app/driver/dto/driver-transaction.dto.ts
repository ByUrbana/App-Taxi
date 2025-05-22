import {
  FilterableField,
  FilterableRelation,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DriverDeductTransactionType } from '@urbana/database/enums/driver-deduct-transaction-type.enum';
import { DriverRechargeTransactionType } from '@urbana/database/enums/driver-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { DriverDTO } from './driver.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { SavedPaymentMethodDTO } from '../../customer/dto/saved-payment-method.dto';
import { PayoutMethodDTO } from '../../payout/dto/payout-method.dto';

@ObjectType('DriverTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
@Relation('driver', () => DriverDTO, { nullable: true })
@Relation('payoutAccount', () => PayoutAccountDTO, {
  nullable: true,
})
@FilterableRelation('payoutMethod', () => PayoutMethodDTO, {
  nullable: true,
})
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
export class DriverTransactionDTO {
  @FilterableField(() => ID)
  id!: number;
  @FilterableField()
  createdAt: Date;
  @FilterableField(() => TransactionAction)
  action: TransactionAction;
  @FilterableField(() => TransactionStatus)
  status: TransactionStatus;
  deductType?: DriverDeductTransactionType;
  rechargeType?: DriverRechargeTransactionType;
  @FilterableField()
  amount: number;
  @FilterableField()
  currency: string;
  refrenceNumber?: string;
  @FilterableField(() => ID)
  driverId!: number;
  @FilterableField(() => ID)
  paymentGatewayId?: number;
  @FilterableField(() => ID)
  payoutSessionId?: number;
  @FilterableField(() => ID)
  payoutAccountId?: number;
  @FilterableField(() => ID)
  payoutMethodId?: number;
  @FilterableField(() => ID)
  payoutSessionMethodId?: number;
  @Field(() => ID)
  operatorId?: number;
  requestId?: number;
  description?: string;
}
