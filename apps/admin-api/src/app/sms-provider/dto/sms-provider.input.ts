import { InputType } from '@nestjs/graphql';
import { SMSProviderType } from '@urbana/database/enums/sms-provider-type.enum';

@InputType()
export class SMSProviderInput {
  name?: string;
  type?: SMSProviderType;
  isDefault?: boolean;
  accountId?: string;
  authToken?: string;
  fromNumber?: string;
  verificationTemplate?: string;
  smsType?: string;
}
