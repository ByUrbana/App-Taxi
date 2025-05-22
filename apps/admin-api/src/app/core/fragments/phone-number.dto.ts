import { InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('PhoneNumber')
@InputType('PhoneNumberInput')
export class PhoneNumberDTO {
  countryCode: string;
  number: string;
}
