import { ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { SMSStatus } from '@urbana/database/enums/sms-status.enum';
import { SMSType } from '@urbana/database/enums/sms-type.enum';

@ObjectType('SMS')
export class SMSDTO {
  @IDField(() => ID)
  id: number;
  countryIsoCode!: string;
  to!: string;
  from!: string;
  message!: string;
  status!: SMSStatus;
  type!: SMSType;
  providerId!: number;
}
