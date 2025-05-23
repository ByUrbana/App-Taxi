import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
import { RiderDeductTransactionType } from '@urbana/database/enums/rider-deduct-transaction-type.enum';
import { RiderRechargeTransactionType } from '@urbana/database/enums/rider-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';

import { UserContext } from '../../auth/authenticated-user';

@ObjectType('RiderTransacion')
@Authorize({
  authorize: (context: UserContext) => ({
    riderId: { eq: context.req.user.id },
  }),
})
export class RiderTransactionDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => GraphQLTimestamp)
  createdAt: number;
  action: TransactionAction;
  deductType?: RiderDeductTransactionType;
  rechargeType?: RiderRechargeTransactionType;
  amount!: number;
  currency: string;
  refrenceNumber?: string;
  @FilterableField(() => ID, { filterOnly: true })
  riderId: number;
  @FilterableField(() => ID, { filterOnly: true })
  shopOrderId: number;
}
