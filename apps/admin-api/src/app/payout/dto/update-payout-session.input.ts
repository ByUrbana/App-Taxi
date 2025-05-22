import { Field, InputType } from '@nestjs/graphql';
import { PayoutSessionStatus } from '@urbana/database/enums/payout-session-status.enum';

@InputType()
export class UpdatePayoutSessionInput {
  @Field(() => PayoutSessionStatus)
  status: PayoutSessionStatus;
}
