import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { TimeFrequency } from '@urbana/database/enums/time-frequency.enum';

@ObjectType('DriverShiftRule')
export class DriverShiftRuleDTO {
  @IDField(() => ID)
  id: number;
  timeFrequency: TimeFrequency;
  @Field(() => Int)
  maxHoursPerFrequency: number;
  @Field(() => Int)
  mandatoryBreakMinutes: number;
}
