import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, entities } from '@urbana/database';
import { GeoModule } from '@urbana/geo/geo.module';
import { RedisModule } from '@songkeys/nestjs-redis';
import { Context as WSContext } from 'graphql-ws';
import { join } from 'path';
import { AccountingModule } from './accounting/accounting.module';
import { AddressModule } from './address/address.module';
import { AdminApiSetupNotFoundController } from './admin-api-setup-not-found.controller';
import { AppController } from './admin-api.controller';
import { AnnouncementModule } from './announcement/announcement.module';
import { AuthModule } from './auth/auth.module';
import { validateToken } from './auth/jwt.strategy';
import { CarModule } from './car/car.module';
import { ConfigurationModule } from './config/configuration.module';
import { CouponModule } from './coupon/coupon.module';
import { DriverModule } from './driver/driver.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FleetModule } from './fleet/fleet.module';
import { OperatorModule } from './operator/operator.module';
import { OrderModule } from './order/order.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { PayoutModule } from './payout/payout.module';
import { RegionModule } from './region/region.module';
import { CustomerModule } from './customer/customer.module';
import { ServiceModule } from './service/service.module';
import { UploadModule } from './upload/upload.module';
import { UploadService } from './upload/upload.service';
import { SOSModule } from './sos/sos.module';
import { RewardModule } from './reward/reward.module';
import { GiftCardModule } from './gift-card/gift-card.module';
import { SMSProviderModule } from './sms-provider/sms-provider.module';
import { ShopModule } from './shop/shop.module';
import { ParkingModule } from './parking/parking.module';
import { InsightsModule } from './insights/insights.module';
import { ZonePriceModule } from './zone_price/zone-price.module';
import { DriverDocumentModule } from './driver-document/driver-document.module';
import { DriverShiftRuleModule } from './driver-shift-rule/driver-shift-rule.module';
import {
  getConfig,
  LicenseVerifyModule,
  LicenseVerifyService,
} from 'license-verify';
import { ComplaintModule } from './taxi-support-request/taxi-support-request.module';
import { NotificationModule } from './notification/notification.module';

@Module({})
export class AdminAPIModule implements OnModuleInit {
  constructor(private readonly licenseVerifyService: LicenseVerifyService) {}

  async onModuleInit() {
    const license = await this.licenseVerifyService.verifyLicense();
    Logger.log(license, 'AdminAPIModule.onModuleInit.license');
    Logger.log(
      process.env.NODE_ENV ?? 'prod',
      'AdminAPIModule.onModuleInit.env',
    );
  }

  static async register(): Promise<DynamicModule> {
    if (await getConfig(process.env.NODE_ENV ?? 'prod')) {
      return {
        module: AdminAPIModule,
        imports: [
          DatabaseModule,
          LicenseVerifyModule,
          GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            context: ({ req, res, extra }) => {
              return extra && extra.user
                ? {
                    req: req,
                    res: res,
                    user: extra.user,
                  }
                : { req: req, res: res };
            },
            subscriptions: {
              'graphql-ws': {
                onConnect: async (context: WSContext) => {
                  const { connectionParams, extra } = context;
                  if (connectionParams.authToken) {
                    Logger.log(
                      `connection established with token ${connectionParams.authToken}`,
                      'GraphQL',
                    );
                    const userObject = await validateToken(
                      connectionParams!.authToken as string,
                    );
                    Logger.log(
                      `userObject: ${JSON.stringify(userObject)}`,
                      'GraphQL',
                    );
                    extra['user'] = userObject;
                    return;
                  }
                  throw new Error('Missing auth token!');
                },
                onDisconnect: () => {
                  Logger.log('connection disconnected', 'GraphQL');
                },
                onSubscribe: () => {
                  Logger.log(`subscription started`, 'GraphQL');
                },
              },
            },
            autoSchemaFile: join(
              process.cwd(),
              'apps/admin-frontend/lib/schema.graphql',
            ),
          }),
          TypeOrmModule.forFeature(entities),
          ServiceModule,
          OperatorModule,
          CustomerModule,
          InsightsModule,
          DriverModule,
          DriverDocumentModule,
          DriverShiftRuleModule,
          FleetModule,
          OrderModule,
          AnnouncementModule,
          CouponModule,
          GiftCardModule,
          AccountingModule,
          RegionModule,
          PaymentGatewayModule,
          CarModule,
          FeedbackModule,
          AddressModule,
          AuthModule,
          PayoutModule,
          UploadModule,
          SOSModule,
          RewardModule,
          ComplaintModule,
          GeoModule,
          ShopModule,
          ParkingModule,
          ConfigurationModule,
          HttpModule,
          SMSProviderModule,
          ZonePriceModule,
          NotificationModule,
          RedisModule.forRoot({
            closeClient: true,
            commonOptions: { db: 2 },
            config: {
              host: process.env.REDIS_HOST ?? 'localhost',
            },
          }),
        ],
        providers: [UploadService],
        controllers: [AppController],
      };
    }
    return {
      module: AdminAPIModule,
      imports: [
        HttpModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
        ConfigurationModule,
        LicenseVerifyModule,
      ],
      controllers: [AdminApiSetupNotFoundController],
    };
  }
}
