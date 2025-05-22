import { Field, ID, InputType } from '@nestjs/graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';

@InputType()
export class ManualPayoutInput {
  @Field(() => AppType, {
    description:
      "Fill this with the user's app type. Taxi for a driver, Parking for a Park Owner and Shop for a shop owner",
  })
  appType: AppType;
  @Field(() => ID)
  userTransactionId: number;
  transactionNumber: string;
  description?: string;
}
