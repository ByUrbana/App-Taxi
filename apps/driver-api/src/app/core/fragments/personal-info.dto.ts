import { InputType, ObjectType } from '@nestjs/graphql';
import { Gender } from '@urbana/database/enums/gender.enum';

@ObjectType('PersonalInfo')
@InputType('PersonalInfoInput')
export class PersonalInfoDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  gender?: Gender;
  address?: string;
}
