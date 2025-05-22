import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ShopDateRangePairInput {
  @Field(() => ID)
  shopId?: number;
  @Field()
  startDate?: Date;

  @Field()
  endDate?: Date;
}
