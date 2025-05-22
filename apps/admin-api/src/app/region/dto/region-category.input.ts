import { InputType } from '@nestjs/graphql';

@InputType()
export class RegionCategoryInput {
  name!: string;
  currency!: string;
}
