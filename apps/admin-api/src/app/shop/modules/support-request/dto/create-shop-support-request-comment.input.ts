import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShopSupportRequestCommentInput {
  @Field(() => ID)
  supportRequestId: number;
  comment: string;
}
