import { Field, InputType, Int } from '@nestjs/graphql';
import { TimeFrequency } from '@urbana/database/enums/time-frequency.enum';

@InputType()
export class DriverShiftRuleInput {
  timeFrequency: TimeFrequency;
  @Field(() => Int)
  maxHoursPerFrequency: number;
  @Field(() => Int)
  mandatoryBreakMinutes: number;
}
