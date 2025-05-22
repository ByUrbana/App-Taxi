import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShopCategoryInput {
  name: string;
  description?: string;
  @Field(() => ID)
  imageId: number;
}
