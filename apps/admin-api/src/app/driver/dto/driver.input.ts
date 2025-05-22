import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { DriverStatus } from '@urbana/database/enums/driver-status.enum';
import { Gender } from '@urbana/database/enums/gender.enum';
import { DeliveryPackageSize } from '@urbana/database/enums/package-size.enum';

@InputType()
export class UpdateDriverInput {
  @Field(() => ID)
  fleetId?: number;
  @Field(() => ID)
  carId?: number;
  mobileNumber?: string;
  @Field(() => ID)
  carColorId?: number;
  firstName?: string;
  lastName?: string;
  certificateNumber?: string;
  canDeliver?: boolean;
  maxDeliveryPackageSize?: DeliveryPackageSize;
  email?: string;
  password?: string;
  @Field(() => Int)
  carProductionYear?: number;
  carPlate?: string;
  status?: DriverStatus;
  gender?: Gender;
  accountNumber?: string;
  bankName?: string;
  bankRoutingNumber?: string;
  bankSwift?: string;
  address?: string;
  softRejectionNote?: string;
  @Field(() => ID)
  mediaId?: number;
}
