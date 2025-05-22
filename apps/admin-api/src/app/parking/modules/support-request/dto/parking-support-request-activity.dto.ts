import { ID, ObjectType } from '@nestjs/graphql';
import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ComplaintActivityType } from '@urbana/database/enums/complaint-activity-type.enum';
import { OperatorDTO } from '../../../../operator/dto/operator.dto';
import { ComplaintStatus } from '@urbana/database/enums/complaint-status.enum';

@ObjectType('ParkingSupportRequestActivity')
@Relation('actor', () => OperatorDTO, { nullable: true })
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
@UnPagedRelation('unassignedFromStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
export class ParkingSupportRequestActivityDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  type: ComplaintActivityType;
  comment?: string;
  statusFrom?: ComplaintStatus;
  statusTo?: ComplaintStatus;
}
