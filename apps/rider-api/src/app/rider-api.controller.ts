import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { RiderRechargeTransactionType } from '@urbana/database/enums/rider-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as fastify from 'fastify';
import { join } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { createWriteStream, promises } from 'fs';

const pump = promisify(pipeline);

import { RestJwtAuthGuard } from './auth/rest-jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { Repository } from 'typeorm';
import { MediaEntity } from '@urbana/database/media.entity';
import { CryptoService } from '@urbana/database';
import { RiderOrderService } from './order/rider-order.service';
import { SharedOrderService } from '@urbana/order/shared-order.service';
import { InjectPubSub } from '@ptc-org/nestjs-query-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { OrderStatus } from '@urbana/database/enums/order-status.enum';
import { version } from 'package.json';
import { PaymentEntity } from '@urbana/database/payment.entity';
import { SharedCustomerWalletService } from '@urbana/customer-wallet';

@Controller()
export class RiderAPIController {
  constructor(
    private readonly sharedCustomerWalletService: SharedCustomerWalletService,
    private sharedOrderService: SharedOrderService,
    private riderOrderService: RiderOrderService,
    private cryptoService: CryptoService,
    @InjectPubSub()
    private pubSub: RedisPubSub,
    @InjectRepository(CustomerEntity)
    private riderRepository: Repository<CustomerEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
  ) {}

  @Get()
  async defaultPath(@Res() res: fastify.FastifyReply) {
    res.send(`✅ Rider API microservice running.\nVersion: ${version}`);
  }

  @Get('payment_result')
  async verifyPayment(
    @Req()
    req: FastifyRequest<{
      Querystring: { token: string; redirect: '1' | '0' };
    }>,
    @Res() res: FastifyReply,
  ) {
    const token = req.query.token;
    const decrypted = await this.cryptoService.decrypt(token);
    Logger.log('Payment:' + JSON.stringify(decrypted));

    if (decrypted.userType == 'client' || decrypted.userType == 'rider') {
      if (decrypted.status == 'success') {
        await this.sharedCustomerWalletService.rechargeWallet({
          riderId: decrypted.userId,
          amount: decrypted.amount,
          currency: decrypted.currency,
          refrenceNumber: decrypted.transactionNumber,
          action: TransactionAction.Recharge,
          rechargeType: RiderRechargeTransactionType.InAppPayment,
          paymentGatewayId: decrypted.gatewayId,
          status: TransactionStatus.Done,
        });
        await this.paymentRepository.delete({
          transactionNumber: decrypted.transactionNumber,
        });
        let order = await this.riderOrderService.getCurrentOrder(
          decrypted.userId,
        );
        if (order?.status == OrderStatus.WaitingForPostPay) {
          await this.sharedOrderService.finish(order.id);
          order = await this.riderOrderService.getCurrentOrder(
            decrypted.userId,
          );
          this.pubSub.publish('orderUpdated', { orderUpdated: order });
        } else if (order?.status == OrderStatus.WaitingForPrePay) {
          order = await this.sharedOrderService.processPrePay(order.id);
          this.pubSub.publish('orderUpdated', { orderUpdated: order });
        }
        if (req.query.redirect == null || req.query.redirect == '1')
          res
            .code(301)
            .redirect(
              `${
                process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
              }://`,
              301,
            );
        res.send(
          'Transaction successful. Close this page and go back to the app.',
        );
      } else if (decrypted.status == 'authorized') {
        let order = await this.riderOrderService.getCurrentOrder(
          decrypted.userId,
        );
        order = await this.sharedOrderService.processPrePay(
          order.id,
          decrypted.amount,
        );
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
        res
          .code(301)
          .redirect(
            `${
              process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
            }://`,
            301,
          );
        res.send(
          'Transaction successful. Close this page and go back to the app.',
        );
      } else {
        res
          .code(301)
          .redirect(
            `${
              process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'
            }://`,
            301,
          );
        res.send(
          "Transaction wasn't successful. You can go back to the app and redo this.",
        );
      }
    }
  }

  @Post('saved_payment_method_charged')
  async savedPaymentMethodCharged(
    @Req()
    req: FastifyRequest<{
      Body: { token: string };
    }>,
    @Res() res: FastifyReply,
  ) {
    const token = req.body.token;
    const decrypted = await this.cryptoService.decrypt(token);
    Logger.log('Payment:' + JSON.stringify(decrypted));
    const payment = await this.paymentRepository.findOneOrFail({
      where: { transactionNumber: decrypted.transactionNumber },
    });
    if (decrypted.status == 'success') {
      await this.sharedCustomerWalletService.rechargeWallet({
        riderId: parseInt(payment.userId),
        amount: payment.amount,
        currency: payment.currency,
        refrenceNumber: payment.transactionNumber,
        action: TransactionAction.Recharge,
        rechargeType: RiderRechargeTransactionType.InAppPayment,
        paymentGatewayId: payment.gatewayId,
        savedPaymentMethodId: payment.savedPaymentMethodId,
        status: TransactionStatus.Done,
      });
      await this.paymentRepository.delete({
        transactionNumber: decrypted.transactionNumber,
      });
      let order = await this.riderOrderService.getCurrentOrder(
        parseInt(payment.userId),
      );
      if (order?.status == OrderStatus.WaitingForPostPay) {
        await this.sharedOrderService.finish(order.id);
        order = await this.riderOrderService.getCurrentOrder(
          parseInt(payment.userId),
        );
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
      } else if (order?.status == OrderStatus.WaitingForPrePay) {
        order = await this.sharedOrderService.processPrePay(order.id);
        this.pubSub.publish('orderUpdated', { orderUpdated: order });
      }
    }
    res.send('OK');
  }

  @Get('success_attach')
  async successAttach(
    @Req() req: FastifyRequest<{ Querystring: { session_id: string } }>,
    @Res() res: FastifyReply,
  ) {
    res.redirect(
      `${process.env.RIDER_APPLICATION_ID ?? 'default.rider.redirection'}://`,
      301,
    );
  }

  @Post('upload_profile')
  @UseGuards(RestJwtAuthGuard)
  async upload(
    @Request() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply,
  ) {
    const data = await req.file();
    const dir = 'uploads';
    await promises.mkdir(dir, { recursive: true });
    const _fileName = join(dir, `${new Date().getTime()}-${data.filename}`);
    await pump(data.file, createWriteStream(_fileName));
    const insert = await this.mediaRepository.insert({ address: _fileName });
    await this.riderRepository.update((req as unknown as any).user.id, {
      mediaId: insert.raw.insertId,
    });
    res
      .code(200)
      .send({ id: insert.raw.insertId.toString(), address: _fileName });
  }

  @Get('/debug-sentry')
  getError() {
    throw new Error('My first Sentry error!');
  }
}
