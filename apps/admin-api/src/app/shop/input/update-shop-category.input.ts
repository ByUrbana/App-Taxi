import { Field, ID, InputType } from '@nestjs/graphql';
import { ShopCategoryStatus } from '@urbana/database/shop/enums/shop-category-status.enum';

@InputType()
export class UpdateShopCategoryInput {
  name?: string;
  description?: string;
  @Field(() => ID)
  imageId?: number;
  status?: ShopCategoryStatus;
}
