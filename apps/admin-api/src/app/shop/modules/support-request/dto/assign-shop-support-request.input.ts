import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignShopSupportRequestInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => [ID])
  staffIds: number[];
}
