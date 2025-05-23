import {
  Authorize,
  BeforeQueryMany,
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import {
  Field,
  ID,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql';
import { PaymentGatewayType } from '@urbana/database/enums/payment-gateway-type.enum';
import { UserContext } from '../../auth/authenticated-user';
import { MediaDTO } from '../../upload/media.dto';
import { GatewayLinkMethod } from '@urbana/database/enums/gateway-link-method';

@ObjectType('PaymentGateway')
@Authorize({
  authorize: (context: UserContext) =>
    ({ enabled: { is: true } }) as unknown as any,
})
@Relation('media', () => MediaDTO, {
  nullable: true,
})
export class PaymentGatewayDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  enabled: boolean;
  title: string;
  type: PaymentGatewayType;
  publicKey?: string;
  @Field(() => GatewayLinkMethod, {
    middleware: [
      async (ctx: MiddlewareContext, next: NextFn) => {
        const type = ctx.source.type;
        return type === PaymentGatewayType.Stripe
          ? GatewayLinkMethod.redirect
          : GatewayLinkMethod.none;
      },
    ],
  })
  linkMethod!: GatewayLinkMethod;
}
