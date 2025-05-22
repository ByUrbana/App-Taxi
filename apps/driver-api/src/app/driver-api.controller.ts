import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as fastify from 'fastify';
import { RestJwtAuthGuard } from './auth/rest-jwt-auth.guard';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { createWriteStream, promises } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { MediaEntity } from '@urbana/database/media.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
const pump = promisify(pipeline);
import { CryptoService } from '@urbana/database';
import { SharedDriverService } from '@urbana/order/shared-driver.service';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { DriverRechargeTransactionType } from '@urbana/database/enums/driver-recharge-transaction-type.enum';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { version } from 'package.json';
import { PaymentEntity } from '@urbana/database/payment.entity';
import { DriverToDriverDocumentEntity } from '@urbana/database/taxi/driver-to-driver-document.entity';

@Controller()
export class DriverAPIController {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @InjectRepository(DriverToDriverDocumentEntity)
    private driverDocumentRepository: Repository<DriverToDriverDocumentEntity>,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    private cryptoService: CryptoService,
    private sharedDriverService: SharedDriverService,
  ) {}

  @Get()
  async defaultPath(@Res() res: fastify.FastifyReply) {
    res.send(`✅ Driver API microservice running.\nVersion: ${version}`);
  }

  @Get('payment_result')
  async verifyPayment(
    @Req() req: fastify.FastifyRequest<{ Querystring: { token: string } }>,
    @Res() res: fastify.FastifyReply,
  ) {
    const token = req.query.token;
    const decrypted = await this.cryptoService.decrypt(token);
    if (decrypted.userType == 'driver') {
      if (decrypted.status == 'success') {
        await this.sharedDriverService.rechargeWallet({
          driverId: decrypted.userId,
          amount: decrypted.amount,
          currency: decrypted.currency,
          refrenceNumber: decrypted.transactionNumber,
          action: TransactionAction.Recharge,
          rechargeType: DriverRechargeTransactionType.InAppPayment,
          paymentGatewayId: decrypted.gatewayId,
          status: TransactionStatus.Done,
        });
        await this.paymentRepository.delete({
          transactionNumber: decrypted.transactionNumber,
        });
      }
    }
    res
      .code(301)
      .redirect(
        `${
          process.env.DRIVER_APPLICATION_ID ?? 'default.driver.redirection'
        }://`,
      );
  }

  @Get('success_message')
  async successMessage(
    @Req()
    req: fastify.FastifyRequest<{
      Querystring: { id_order: string };
      Body: { posted_data: string };
    }>,
    @Res() res: fastify.FastifyReply,
  ) {
    res.send('Transaction successful. Close this page and go back to the app.');
  }

  @Post('upload_profile')
  @UseGuards(RestJwtAuthGuard)
  async upload(@Request() req: any, @Res() res: fastify.FastifyReply) {
    const data = await req.file();
    const dir = 'uploads';
    await promises.mkdir(dir, { recursive: true });
    const _fileName = join(dir, `${new Date().getTime()}-${data.filename}`);
    await pump(data.file, createWriteStream(_fileName));
    const insert = await this.mediaRepository.save({ address: _fileName });
    await this.driverRepository.update((req as unknown as any).user.id, {
      mediaId: insert.id,
    });
    insert.id = insert.id.toString() as unknown as any;
    res.code(200).send(insert);
  }

  @Post('upload_document')
  @UseGuards(RestJwtAuthGuard)
  async uploadDocuement(
    @Request()
    req: fastify.FastifyRequest<{ Body: { requestedDocumentId: string } }>,
    @Res() res: fastify.FastifyReply,
  ) {
    const data = await req.file();
    const dir = 'uploads';
    await promises.mkdir(dir, { recursive: true });
    const _fileName = join(dir, `${new Date().getTime()}-${data.filename}`);
    await pump(data.file, createWriteStream(_fileName));
    const insert = await this.mediaRepository.save({
      address: _fileName,
      driverDocumentId: (req as unknown as any).user.id,
    });
    insert.id = parseInt(insert.id.toString() as unknown as string);
    const doc = this.driverDocumentRepository.create();
    doc.driverId = (req as unknown as any).user.id;
    doc.driverDocumentId = parseInt(req.body.requestedDocumentId);
    res.code(200).send(insert);
  }

  @Post('upload_media')
  @UseGuards(RestJwtAuthGuard)
  async uploadMedia(@Request() req: any, @Res() res: fastify.FastifyReply) {
    const data = await req.file();
    const dir = 'uploads';
    await promises.mkdir(dir, { recursive: true });
    const _fileName = join(dir, `${new Date().getTime()}-${data.filename}`);
    await pump(data.file, createWriteStream(_fileName));
    const insert = await this.mediaRepository.save({
      address: _fileName,
      uploadedByDriverId: (req as unknown as any).user.id,
    });
    insert.id = insert.id.toString() as unknown as any;
    res.code(200).send(insert);
  }

  @Get('/debug-sentry')
  getError() {
    throw new Error('My first Sentry error!');
  }
}
