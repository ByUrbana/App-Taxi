import { Field, ID, InputType } from '@nestjs/graphql';
import { WeekdayScheduleDTO } from 'libs/database/src/lib/interfaces/weekday-schedule.dto';

@InputType()
export class CreateShopItemPresetInput {
  name!: string;
  @Field(() => ID)
  shopId!: number;
  weeklySchedule!: WeekdayScheduleDTO[];
}
