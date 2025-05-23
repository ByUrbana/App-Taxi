import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { DriverStatus } from '@urbana/database/enums/driver-status.enum';
import { Gender } from '@urbana/database/enums/gender.enum';

@InputType()
export class UpdateDriverInput {
  firstName?: string;
  lastName?: string;
  status?: DriverStatus;
  certificateNumber?: string;
  email?: string;
  @Field(() => Int)
  carProductionYear?: number;
  carPlate?: string;
  @Field(() => ID)
  mediaId?: number;
  gender?: Gender;
  accountNumber?: string;
  bankName?: string;
  bankRoutingNumber?: string;
  password?: string;
  bankSwift?: string;
  @Field(() => Int, { nullable: true })
  presetAvatarNumber?: number;
  address?: string;
  @Field(() => ID)
  carModelId?: number;
  @Field(() => ID)
  carId?: number;
  @Field(() => ID)
  carColorId?: number;
  notificationPlayerId?: string;
  @Field(() => Int)
  searchDistance?: number;
}
