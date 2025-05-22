import { Field, ID, InputType } from '@nestjs/graphql';
import { Point } from '@urbana/database';

@InputType()
export class CalculateFareInput {
  points!: Point[];
  @Field(() => ID)
  riderId!: number;
}
