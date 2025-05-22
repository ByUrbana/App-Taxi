import { InputType } from '@nestjs/graphql';
import { ServiceOptionIcon } from '@urbana/database/enums/service-option-icon.enum';
import { ServiceOptionType } from '@urbana/database/enums/service-option-type.enum';

@InputType()
export class ServiceOptionInput {
  name: string;
  type: ServiceOptionType;
  additionalFee?: number;
  icon: ServiceOptionIcon;
}
