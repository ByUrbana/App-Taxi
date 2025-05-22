import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ReviewStatus } from '@urbana/database/enums/review.status.enum';
import { ShopFeedbackParameterDTO } from './shop-feedback-parameter.dto';
import { ShopOrderCartDTO } from '../../../dto/shop-order-cart.dto';

@ObjectType('ShopFeedback')
@FilterableRelation('orderCart', () => ShopOrderCartDTO)
@UnPagedRelation('parameters', () => ShopFeedbackParameterDTO)
export class ShopFeedbackDTO {
  @IDField(() => ID)
  id: number;
  @Field(() => Int, { description: 'The score of the review, from 0 to 100' })
  score: number;
  @FilterableField()
  comment?: string;
  @FilterableField(() => ReviewStatus)
  status: ReviewStatus;
  createdAt: Date;
  @FilterableField(() => ID)
  shopId: number;
  @FilterableField(() => ID)
  customerId: number;
}
