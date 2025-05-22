import { ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('ShopFeedbackParameter')
export class ShopFeedbackParameterDTO {
  @IDField(() => ID)
  id: number;
  isGood: boolean;
  name: string;
}
