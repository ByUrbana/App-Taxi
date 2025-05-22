import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { ParkSpotCarSize } from '@urbana/database/parking/enums/park-spot-car-size.enum';
import { ParkSpotFacility } from '@urbana/database/parking/enums/park-spot-facility.enum';
import { ParkSpotType } from '@urbana/database/parking/enums/park-spot-type.enum';
import { ParkSpotStatus } from '@urbana/database/parking/enums/park-spot-status.enum';
import { WeekdayScheduleDTO } from 'libs/database/src/lib/interfaces/weekday-schedule.dto';

@InputType()
export class UpdateParkSpotInput {
  @Field(() => ParkSpotStatus)
  status?: ParkSpotStatus;
  @Field(() => ParkSpotType)
  type?: ParkSpotType;
  @Field(() => String)
  name?: string;
  @Field(() => Point)
  location?: Point;
  @Field(() => String, { nullable: true })
  address?: string;
  phoneNumber?: string;
  email?: string;
  @Field(() => [WeekdayScheduleDTO])
  weeklySchedule?: WeekdayScheduleDTO[];
  @Field(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  carPrice?: number;
  @Field(() => Int)
  carSpaces?: number;
  bikePrice?: number;
  @Field(() => Int)
  bikeSpaces?: number;
  truckPrice?: number;
  @Field(() => Int)
  truckSpaces?: number;
  description?: string;
  @Field(() => [ParkSpotFacility])
  facilities?: ParkSpotFacility[];
  @Field(() => ID)
  mainImageId?: number;
}
