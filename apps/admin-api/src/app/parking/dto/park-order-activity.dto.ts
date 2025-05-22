import { ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ParkOrderStatus } from '@urbana/database/parking/enums/park-order-status.enum';

@ObjectType('ParkOrderActivity')
export class ParkOrderActivityDTO {
  @IDField(() => ID)
  id!: number;
  updatedAt?: Date;
  status!: ParkOrderStatus;
  expectedBy?: Date;
}
