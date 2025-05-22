import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  IDField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ComplaintStatus } from '@urbana/database/enums/complaint-status.enum';
import { OperatorDTO } from '../../../../operator/dto/operator.dto';
import { ParkOrderDTO } from '../../../dto/park-order.dto';
import { ParkingSupportRequestActivityDTO } from './parking-support-request-activity.dto';

@ObjectType('ParkingSupportRequest')
@FilterableRelation('parkOrder', () => ParkOrderDTO)
@UnPagedRelation('assignedToStaffs', () => OperatorDTO, {
  disableFilter: true,
  disableSort: true,
})
@UnPagedRelation('activities', () => ParkingSupportRequestActivityDTO)
export class ParkingSupportRequestDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  @FilterableField(() => Boolean)
  requestedByOwner: boolean;
  subject: string;
  content?: string;
  @FilterableField(() => ComplaintStatus)
  status: ComplaintStatus;
  @FilterableField(() => ID, { filterOnly: true })
  parkOrderId: number;
}
