import { InputType } from '@nestjs/graphql';
import { Gender } from '@urbana/database/enums/gender.enum';
import { RiderStatus } from '@urbana/database/enums/rider-status.enum';

@InputType()
export class RiderInput {
  status?: RiderStatus;
  firstName?: string;
  lastName?: string;
  countryIso?: string;
  mobileNumber?: string;
  registrationTimestamp?: Date;
  email?: string;
  gender?: Gender;
  isResident?: boolean;
  idNumber?: string;
  password?: string;
}
