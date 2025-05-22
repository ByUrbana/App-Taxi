import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CancelShopOrderCartsInput {
  @Field(() => [ID])
  cartIds: number[];
}
