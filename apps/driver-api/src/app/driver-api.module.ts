import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService, DatabaseModule, entities } from '@urbana/database';

import { RedisModule } from '@songkeys/nestjs-redis';
import { join } from 'path';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SharedDriverService } from '@urbana/order/shared-driver.service';

import { AnnouncementsModule } from './announcemnts/announcements.module';
import { AuthModule } from './auth/auth.module';
import { validateToken } from './auth/jwt.strategy';
import { ChatModule } from './chat/chat.module';
import { ComplaintModule } from './complaint/complaint.module';
import { DriverApiSetupNotFoundController } from './driver-api-setup-not-found.controller';
import { DriverAPIController } from './driver-api.controller';
import { DriverModule } from './driver/driver.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { OrderModule } from './order/order.module';
import { PayoutModule } from './payout/payout.module';
import { ServiceModule } from './service/service.module';
import { SOSModule } from './sos/sos.module';
import { UploadModule } from './upload/upload.module';
import { WalletModule } from './wallet/wallet.module';
import { APP_FILTER } from '@nestjs/core';
import {
  getConfig,
  LicenseVerifyModule,
  LicenseVerifyService,
} from 'license-verify';

@Module({})
export class DriverAPIModule implements OnModuleInit {
  constructor(private licenseService: LicenseVerifyService) {}

  async onModuleInit() {
    this.licenseService.verifyLicense();
  }

  static async register(): Promise<DynamicModule> {
    const config = await getConfig(process.env.NODE_ENV ?? 'prod');
    if (config) {
      return {
        module: DriverAPIModule,
        imports: [
          DatabaseModule,
          ServiceModule,
          LicenseVerifyModule,
          FeedbacksModule,
          PayoutModule,
          SOSModule,
          SentryModule.forRoot(),
          ConfigModule.forRoot(),
          ScheduleModule.forRoot(),
          GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            // cors: false,
            subscriptions: {
              'subscriptions-transport-ws': {
                keepAlive: 5000,
                onConnect: async (connectionParams: { authToken: string }) => {
                  if (connectionParams.authToken) {
                    return validateToken(connectionParams.authToken);
                  }
                  throw new Error('Missing auth token!');
                },
              },
            },
            autoSchemaFile: join(
              process.cwd(),
              'apps/driver-frontend/lib/core/graphql/schema.gql',
            ),
            buildSchemaOptions: {
              dateScalarMode: 'timestamp',
            },
          }),
          TypeOrmModule.forFeature(entities),
          AuthModule.register(),
          UploadModule,
          DriverModule,
          ChatModule,
          OrderModule,
          WalletModule,
          RedisModule.forRoot({
            closeClient: true,
            commonOptions: { db: 2 },
            config: {
              host: process.env.REDIS_HOST ?? 'localhost',
            },
          }),
          AnnouncementsModule,
          ComplaintModule,
        ],
        controllers: [DriverAPIController],
        providers: [
          CryptoService,
          SharedDriverService,
          {
            provide: APP_FILTER,
            useClass: SentryGlobalFilter,
          },
        ],
      };
    }

    return {
      module: DriverAPIModule,
      imports: [LicenseVerifyModule],
      controllers: [DriverApiSetupNotFoundController],
    };
  }
}
