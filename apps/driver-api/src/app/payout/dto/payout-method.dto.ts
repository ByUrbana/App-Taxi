import {
  Field,
  ID,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql';
import { GatewayLinkMethod } from '@urbana/database/enums/gateway-link-method';
import { PaymentGatewayType } from '@urbana/database/enums/payment-gateway-type.enum';
import { Authorize, IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { PayoutMethodType } from '@urbana/database/enums/payout-method-type.enum';
import { MediaDTO } from '../../upload/media.dto';

@ObjectType('PayoutMethod')
@Relation('media', () => MediaDTO, { nullable: true })
@Authorize({
  authorize: (context, authorizationContext) => ({
    enabled: true,
  }),
})
export class PayoutMethodDTO {
  @IDField(() => ID)
  id: number;
  enabled: boolean;
  name: string;
  type!: PayoutMethodType;
  @Field(() => GatewayLinkMethod, {
    middleware: [
      async (ctx: MiddlewareContext, next: NextFn) => {
        const type = ctx.source.type;
        return type === PaymentGatewayType.Stripe
          ? GatewayLinkMethod.redirect
          : GatewayLinkMethod.manual;
      },
    ],
  })
  linkMethod!: GatewayLinkMethod;
}
