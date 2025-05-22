import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { ComplaintActivityType } from '@urbana/database/enums/complaint-activity-type.enum';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { ComplaintStatus } from '@urbana/database/enums/complaint-status.enum';

@ObjectType('TaxiSupportRequestActivity')
@Relation('actor', () => OperatorDTO)
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
@UnPagedRelation('unassignedFromStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
export class TaxiSupportRequestActivityDTO {
  @IDField(() => ID)
  id!: number;
  createdAt!: Date;
  type: ComplaintActivityType;
  comment?: string;
  statusFrom?: ComplaintStatus;
  statusTo?: ComplaintStatus;
  @FilterableField(() => ID)
  complaintId: number;
}
