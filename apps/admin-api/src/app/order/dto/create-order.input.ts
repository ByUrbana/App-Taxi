import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Point } from '@urbana/database';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  riderId: number;
  @Field(() => ID, { nullable: true })
  driverId?: number;
  @Field(() => ID)
  serviceId!: number;
  points!: Point[];
  addresses!: string[];
  @Field(() => Int, { defaultValue: 0 })
  waitingTimeMinutes!: number;
  @Field(() => Boolean, {
    defaultValue: false,
  })
  twoWay!: boolean;
  @Field(() => [ID], { defaultValue: [] })
  optionIds!: string[];
  @Field(() => Int, { defaultValue: 0 })
  intervalMinutes!: number;
}
