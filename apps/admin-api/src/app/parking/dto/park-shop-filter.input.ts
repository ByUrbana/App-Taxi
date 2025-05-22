import { Field, InputType, Int } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { ParkSpotFacility } from '@urbana/database/parking/enums/park-spot-facility.enum';
import { ParkSpotType } from '@urbana/database/parking/enums/park-spot-type.enum';
import { ParkSpotVehicleType } from '@urbana/database/parking/enums/park-spot-vehicle-type.enum';

@InputType()
export class ParkSpotFilterInput {
  point: Point;
  vehicleType?: ParkSpotVehicleType;
  fromTime?: Date;
  toTime?: Date;
  @Field(() => Int)
  maximumDistance?: number;
  @Field(() => Int)
  minimumRating?: number;
  @Field(() => [ParkSpotFacility])
  facilities?: ParkSpotFacility[];
  parkingType?: ParkSpotType;
}
