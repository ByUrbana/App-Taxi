import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { Point } from '@urbana/database';
import { Gender } from '@urbana/database/enums/gender.enum';
import { ParkSpotCarSize } from '@urbana/database/parking/enums/park-spot-car-size.enum';
import { ParkSpotFacility } from '@urbana/database/parking/enums/park-spot-facility.enum';
import { ParkSpotType } from '@urbana/database/parking/enums/park-spot-type.enum';
import { WeekdayScheduleDTO } from 'libs/database/src/lib/interfaces/weekday-schedule.dto';

@InputType()
export class CreateParkSpotInput {
  type: ParkSpotType;
  @FilterableField(() => String)
  name?: string;
  @Field(() => Point)
  location!: Point;
  address?: string;
  phoneNumber?: string;
  email?: string;
  @Field(() => [WeekdayScheduleDTO])
  weekdaySchedule?: WeekdayScheduleDTO[];
  @Field(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  carPrice?: number;
  @Field(() => Int)
  carSpaces: number;
  bikePrice?: number;
  @Field(() => Int)
  bikeSpaces: number;
  truckPrice?: number;
  @Field(() => Int)
  truckSpaces: number;
  description?: string;
  @Field(() => [ParkSpotFacility])
  facilities!: ParkSpotFacility[];
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  ownerGender: Gender;
  @Field(() => [ID])
  imageIds?: number[];
  @Field(() => ID, { nullable: true })
  mainImageId?: number;
}
