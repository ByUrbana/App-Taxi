import { ID, ObjectType } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
} from '@ptc-org/nestjs-query-graphql';
import { SMSProviderType } from '@urbana/database/enums/sms-provider-type.enum';
import { SMSProviderAuthorizer } from '../sms-provider.authorizer';
import { SMSDTO } from './sms.dto';

@ObjectType('SMSProvider', {
  description: 'SMS Provider',
})
@OffsetConnection('messages', () => SMSDTO, { enableAggregate: true })
@Authorize(SMSProviderAuthorizer)
export class SMSProviderDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  name!: string;
  @FilterableField(() => SMSProviderType)
  type!: SMSProviderType;
  isDefault!: boolean;
  accountId?: string;
  authToken?: string;
  fromNumber?: string;
  verificationTemplate?: string;
  smsType?: string;
}
