import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemCategoryInput {
  name: string;
  @Field(() => ID)
  shopId: number;
}
