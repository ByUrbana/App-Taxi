import { Field, ID, InputType } from '@nestjs/graphql';
import { PayoutMethodType } from '@urbana/database/enums/payout-method-type.enum';

@InputType()
export class CreatePayoutMethodInput {
  enabled?: boolean;
  name!: string;
  description!: string;
  currency!: string;
  type!: PayoutMethodType;
  publicKey?: string;
  privateKey?: string;
  saltKey?: string;
  merchantId?: string;
  @Field(() => ID)
  mediaId?: number;
}
