import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver, ID, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserContext } from '../auth/authenticated-user';
import { GqlAuthGuard } from '../auth/access-token.guard';
import {
  IntentResultToTopUpWalletStatus,
  TopUpWalletInput,
  TopUpWalletResponse,
} from './dto/top-up-wallet.input';
import { CryptoService } from '@urbana/database';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { WalletService } from './wallet.service';
import { SavedPaymentMethodEntity } from '@urbana/database/saved-payment-method.entity';
import {
  IntentResult,
  SetupSavedPaymentMethodDecryptedBody,
} from '@urbana/payment';
import { SetupPaymentMethodDto } from './dto/setup_payment_method.dto';
import { GiftCardDTO } from './dto/gift-card.dto';
import { CommonGiftCardService } from '@urbana/coupon';
import { SavedPaymentMethodDto } from './dto/saved-payment-method.dto';
import { CustomerEntity } from '@urbana/database/customer.entity';

@UseGuards(GqlAuthGuard)
@Resolver()
export class WalletResolver {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
    @InjectRepository(SavedPaymentMethodEntity)
    private savedPaymentMethodRepo: Repository<SavedPaymentMethodEntity>,
    private cryptoService: CryptoService,
    private commongGiftCardService: CommonGiftCardService,
    @Inject(CONTEXT) private context: UserContext,
    private httpService: HttpService,
    private walletService: WalletService,
  ) {}

  @Mutation(() => TopUpWalletResponse)
  async topUpWallet(
    @Args('input', { type: () => TopUpWalletInput }) input: TopUpWalletInput,
    @Args('shouldPreauth', { type: () => Boolean, nullable: true })
    shouldPreauth: boolean,
  ): Promise<TopUpWalletResponse> {
    const paymentLink = await this.walletService.getPaymentLink({
      paymentMode: input.paymentMode,
      gatewayId: input.gatewayId,
      userId: this.context.req.user.id,
      amount: input.amount,
      currency: input.currency,
      orderNumber: input.orderNumber,
      shouldPreauth,
    });
    Logger.log(JSON.stringify(paymentLink), 'paymentLink');
    return {
      status: IntentResultToTopUpWalletStatus(paymentLink.status),
      url: paymentLink.url,
    };
  }

  @Query(() => [SavedPaymentMethodDto])
  async savedPaymentMethods(): Promise<SavedPaymentMethodDto[]> {
    const result = await this.savedPaymentMethodRepo.find({
      where: { riderId: this.context.req.user.id },
    });
    return result.map((method) => ({
      ...method,
      riderId: method.riderId ?? this.context.req.user.id,
    })) as SavedPaymentMethodDto[];
  }

  // @Query(() => [PaymentGatewayDTO])
  // async savableGateways(): Promise<PaymentGatewayDTO[]> {
  //   const result = await this.gatewayRepo.find({
  //     where: { type: In([PaymentGatewayType.Stripe]) },
  //   });
  //   return result;
  // }

  @Mutation(() => SetupPaymentMethodDto)
  async setupPaymentMethod(
    @Args('gatewayId', { type: () => ID }) gatewayId: number,
  ): Promise<SetupPaymentMethodDto> {
    const user = await this.customerRepo.findOneOrFail({
      where: { id: this.context.req.user.id },
      relations: {
        wallets: true,
      },
    });
    const walletsLargestBalance = user.wallets.reduce((prev, current) => {
      return prev.balance > current.balance ? prev : current;
    });
    const obj: SetupSavedPaymentMethodDecryptedBody = {
      gatewayId: gatewayId.toString(),
      userType: 'rider',
      currency: walletsLargestBalance.currency ?? 'usd',
      userId: this.context.req.user.id.toString(),
      returnUrl: `${
        process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
      }://`,
    };
    const encrypted = await this.cryptoService.encrypt(JSON.stringify(obj));
    const result = await firstValueFrom(
      this.httpService.post<IntentResult>(
        `${process.env.GATEWAY_SERVER_URL}/setup_saved_payment_method`,
        {
          token: encrypted,
        },
      ),
    );
    Logger.log(JSON.stringify(result.data), 'setupPaymentMethod');
    return result.data;
  }

  @Mutation(() => GiftCardDTO)
  async redeemGiftCard(
    @Args('code', { type: () => String }) code: string,
  ): Promise<GiftCardDTO> {
    return this.commongGiftCardService.redeemGiftCard({
      code,
      userId: this.context.req.user.id,
      userType: 'rider',
    });
  }

  @Mutation(() => [SavedPaymentMethodDto])
  async markPaymentMethodAsDefault(
    @Args('id', { type: () => ID }) savedPaymentMethodId: number,
  ): Promise<SavedPaymentMethodDto[]> {
    await this.walletService.markPaymentMethodAsDefault({
      userId: this.context.req.user.id,
      savedPaymentMethodId,
    });
    return this.savedPaymentMethodRepo.find({
      where: { riderId: this.context.req.user.id },
    }) as unknown as SavedPaymentMethodDto[];
  }

  @Mutation(() => [SavedPaymentMethodDto])
  async deleteSavedPaymentMethod(
    @Args('id', { type: () => ID }) savedPaymentMethodId: number,
  ): Promise<SavedPaymentMethodDto[]> {
    await this.walletService.deletePaymentMethod({
      userId: this.context.req.user.id,
      savedPaymentMethodId,
    });
    return this.savedPaymentMethodRepo.find({
      where: { riderId: this.context.req.user.id },
    }) as unknown as SavedPaymentMethodDto[];
  }

  // @Query(() => [PaymentGatewayDTO])
  // async paymentGateways(): Promise<PaymentGatewayDTO[]> {
  //   let result = await this.gatewayRepo.find({
  //     where: { enabled: true },
  //   });
  //   result = result.map((item) => {
  //     item['linkMethod'] =
  //       item.type == PaymentGatewayType.Stripe
  //         ? GatewayLinkMethod.redirect
  //         : GatewayLinkMethod.none;
  //     return item;
  //   });
  //   Logger.log(JSON.stringify(result), 'paymentGateways');

  //   return result as unknown as PaymentGatewayDTO[];
  // }
}
