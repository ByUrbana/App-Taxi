import { Field, ID, InputType } from '@nestjs/graphql';
import { PaymentGatewayType } from '@urbana/database/enums/payment-gateway-type.enum';

@InputType()
export class UpdatePaymentGatewayInput {
  enabled?: boolean;
  title?: string;
  type?: PaymentGatewayType;
  publicKey?: string;
  privateKey?: string;
  merchantId?: string;
  saltKey?: string;
  @Field(() => ID)
  mediaId?: number;
}
