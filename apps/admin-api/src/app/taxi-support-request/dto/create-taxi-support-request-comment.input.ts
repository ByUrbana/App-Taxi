import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaxiSupportRequestCommentInput {
  @Field(() => ID)
  supportRequestId: number;
  comment: string;
}
