import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { DriverStatus } from '@urbana/database/enums/driver-status.enum';
import { Gender } from '@urbana/database/enums/gender.enum';

@ObjectType()
export class OnlineDriver {
  location: Point;
  @Field(() => ID)
  driverId: number;
  lastUpdatedAt: Date;
}

@ObjectType()
export class OnlineDriverWithData {
  @Field(() => ID)
  id: number;
  location: Point;
  lastUpdatedAt: Date;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  mobileNumber: string;
  status: DriverStatus;
  gender?: Gender;
  @Field(() => Int)
  rating?: number;
  @Field(() => Int)
  reviewCount: number;
}
