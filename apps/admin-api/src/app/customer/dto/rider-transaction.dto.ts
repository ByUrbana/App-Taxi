import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Float, ID, ObjectType } from '@nestjs/graphql';
import { RiderDeductTransactionType } from '@urbana/database/enums/rider-deduct-transaction-type.enum';
import { RiderRechargeTransactionType } from '@urbana/database/enums/rider-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';

import { OperatorDTO } from '../../operator/dto/operator.dto';
import { PaymentGatewayDTO } from '../../payment-gateway/dto/payment-gateway.dto';
import { CustomerDTO } from './customer.dto';
import { SavedPaymentMethodDTO } from './saved-payment-method.dto';

@ObjectType('RiderTransaction')
@Relation('operator', () => OperatorDTO, { nullable: true })
@Relation('paymentGateway', () => PaymentGatewayDTO, { nullable: true })
@Relation('savedPaymentMethod', () => SavedPaymentMethodDTO, { nullable: true })
@Relation('rider', () => CustomerDTO)
export class RiderTransactionDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => TransactionAction)
  action: TransactionAction;
  @FilterableField()
  createdAt: Date;
  @FilterableField(() => RiderDeductTransactionType)
  deductType?: RiderDeductTransactionType;
  @FilterableField(() => RiderRechargeTransactionType)
  rechargeType?: RiderRechargeTransactionType;
  @FilterableField(() => TransactionStatus)
  status: TransactionStatus;
  @FilterableField(() => Float)
  amount: number;
  @FilterableField(() => String)
  currency: string;
  refrenceNumber?: string;
  description?: string;
  @FilterableField(() => ID)
  riderId!: number;
  @FilterableField(() => ID)
  paymentGatewayId?: number;
  @FilterableField(() => ID)
  savedPaymentMethodId?: number;
  @FilterableField(() => ID)
  operatorId?: number;
  @FilterableField(() => ID, { name: 'requestId' })
  taxiOrderId?: number;
  @FilterableField(() => ID)
  shopOrderId?: number;
  @FilterableField(() => ID)
  parkOrderParkOwnerId?: number;
  @FilterableField(() => ID)
  parkOrderCustomerId?: number;
}
