import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';
import { ParkOrderDTO } from './park-order.dto';

@ObjectType('ParkOrderNote')
@Relation('staff', () => OperatorDTO)
@Relation('parkOrder', () => ParkOrderDTO)
export class ParkOrderNoteDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  @FilterableField(() => ID)
  parkOrderId: number;
  note: string;
}
