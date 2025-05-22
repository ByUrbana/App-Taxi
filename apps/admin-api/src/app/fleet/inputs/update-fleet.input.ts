import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { Point } from '@urbana/database';

@InputType()
export class UpdateFleetInput {
  name?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  userName?: string;
  password?: string;
  accountNumber?: string;
  @Field(() => Float)
  commissionSharePercent?: number;
  commissionShareFlat?: number;
  feeMultiplier?: number;
  address?: string;
  exclusivityAreas?: Point[][];
  @Field(() => ID)
  profilePictureId?: number;
  isBlocked?: boolean;
}
