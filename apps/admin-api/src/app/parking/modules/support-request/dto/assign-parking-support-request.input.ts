import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignParkingSupportRequestInput {
  @Field(() => ID)
  supportRequestId: number;
  @Field(() => [ID])
  staffIds: number[];
}
