import { InputType, ObjectType } from '@nestjs/graphql';
import { PhoneNumberDTO } from './phone-number.dto';

@ObjectType('DeliveryContact')
@InputType('DeliveryContactInput')
export class DeliveryContactDTO {
  name!: string;
  phoneNumber!: PhoneNumberDTO;
  email?: string;
  addressLine1!: string;
  addressLine2?: string;
  zone?: string;
  buildingNumber?: string;
  apartmentNumber?: string;
  city?: string;
  state?: string;
  instructions?: string;
  postalCode?: string;
  companyName?: string;
}
