import { Field, ID, InputType } from '@nestjs/graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';

@InputType()
export class CreatePayoutSessionInput {
  @Field(() => [ID])
  payoutMethodIds: number[];
  minimumAmount: number;
  currency: string;
  description?: string;
  @Field(() => AppType)
  appType: AppType;
}
