import { ID, ObjectType } from '@nestjs/graphql';
import { IDField, OffsetConnection } from '@ptc-org/nestjs-query-graphql';

@ObjectType('ParkingFeedbackParameter')
@OffsetConnection('feedbacks', () => ParkingFeedbackParameterDTO, {
  enableAggregate: true,
})
export class ParkingFeedbackParameterDTO {
  @IDField(() => ID)
  id: number;
  isGood: boolean;
  name: string;
}
