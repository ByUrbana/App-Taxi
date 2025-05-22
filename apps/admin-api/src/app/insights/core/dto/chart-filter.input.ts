import { Field, InputType } from '@nestjs/graphql';
import { ChartInterval } from '@urbana/database/enums/chart-interval.enum';

@InputType()
export class ChartFilterInput {
  startDate: Date;
  endDate: Date;
  @Field(() => ChartInterval)
  interval: ChartInterval;
}
