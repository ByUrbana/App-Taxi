import { ID, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ReviewStatus } from '@urbana/database/enums/review.status.enum';
import { ParkingFeedbackParameterDTO } from './parking-feedback-parameter.dto';
import { ParkOrderDTO } from '../../../dto/park-order.dto';

@ObjectType('ParkingFeedback')
@FilterableRelation('order', () => ParkOrderDTO)
@UnPagedRelation('parameters', () => ParkingFeedbackParameterDTO)
export class ParkingFeedbackDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => Int, {
    description: 'The score of the review, from 0 to 100',
  })
  score: number;
  comment?: string;
  @FilterableField(() => ReviewStatus)
  status: ReviewStatus;
  createdAt: Date;
  @FilterableField(() => ID)
  parkSpotId: number;
  @FilterableField(() => ID)
  customerId: number;
}
