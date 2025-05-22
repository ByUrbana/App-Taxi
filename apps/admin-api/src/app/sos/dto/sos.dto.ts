import {
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { SOSStatus } from '@urbana/database/enums/sos-status.enum';
import { OrderDTO } from '../../order/dto/order.dto';
import { SOSActivityDTO } from './sos-activity.dto';
import { SOSReasonDTO } from './sos-reason.dto';

@ObjectType('DistressSignal')
@UnPagedRelation('activities', () => SOSActivityDTO)
@Relation('order', () => OrderDTO, { relationName: 'request' })
@Relation('reason', () => SOSReasonDTO, { nullable: true })
export class SOSDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  @FilterableField(() => SOSStatus)
  status: SOSStatus;
  comment?: string;
  location?: Point;
  submittedByRider!: boolean;
  requestId: number;
}
