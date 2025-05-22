import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateParkingSupportRequestCommentInput {
  @Field(() => ID)
  supportRequestId: number;
  comment: string;
}
