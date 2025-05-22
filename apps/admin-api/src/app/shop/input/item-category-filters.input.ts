import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ItemCategoryFiltersInput {
  @Field(() => ID)
  shopId!: number;
  timeOfDay!: string;
}
