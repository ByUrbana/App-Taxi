import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateItemCategoryInput {
  name?: string;
}
