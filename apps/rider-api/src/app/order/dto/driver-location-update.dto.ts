import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Point } from '@urbana/database';

@ObjectType('DriverLocationUpdate')
export class DriverLocationUpdateDTO {
  point: Point;
  @Field(() => ID)
  driverId: number;
  @Field(() => ID)
  orderId: number;
}
