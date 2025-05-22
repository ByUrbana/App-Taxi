import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@urbana/database';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { ProviderTransactionEntity } from '@urbana/database/provider-transaction.entity';
import { ProviderWalletEntity } from '@urbana/database/provider-wallet.entity';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { RiderTransactionEntity } from '@urbana/database/rider-transaction.entity';
import { RiderWalletEntity } from '@urbana/database/rider-wallet.entity';
import { ServiceCategoryEntity } from '@urbana/database/taxi/service-category.entity';
import { ServiceEntity } from '@urbana/database/taxi/service.entity';
import { PaymentEntity } from '@urbana/database/payment.entity';
import { FirebaseNotificationModule } from '@urbana/order/firebase-notification-service/firebase-notification-service.module';
import { GoogleServicesModule } from '@urbana/order/google-services/google-services.module';
import { SharedOrderService } from '@urbana/order/shared-order.service';
import { SharedProviderService } from '@urbana/order/shared-provider.service';
import { SharedFleetService } from '@urbana/order/shared-fleet.service';
import { RegionModule } from '@urbana/order/region/region.module';
import { SharedRiderService } from '@urbana/order/shared-rider.service';
import { ServiceService } from '@urbana/order/service.service';

import { OrderDTO } from './dto/order.dto';
import { OrderResolver } from './order.resolver';
import { DriverOrderQueryService } from './driver-order.query-service';
import { RedisHelpersModule } from '@urbana/redis/redis-helper.module';
import { CronJobService } from './cron-job.service';
import { DriverModule } from '../driver/driver.module';
import { SharedDriverService } from '@urbana/order/shared-driver.service';
import { OrderService } from './order.service';
import { FleetWalletEntity } from '@urbana/database/taxi/fleet-wallet.entity';
import { FleetTransactionEntity } from '@urbana/database/taxi/fleet-transaction.entity';
import { OrderSubscriptionService } from './order-subscription.service';
import { RiderDTO } from './dto/rider.dto';
import { RequestActivityEntity } from '@urbana/database/taxi/request-activity.entity';
import { FleetEntity } from '@urbana/database/taxi/fleet.entity';
import { ServiceOptionEntity } from '@urbana/database/taxi/service-option.entity';
import { CommonCouponModule } from '@urbana/coupon';
import { ZonePriceEntity } from '@urbana/database/taxi/zone-price.entity';
import { HttpModule } from '@nestjs/axios';
import { OrderCancelReasonEntity } from '@urbana/database/taxi/order-cancel-reason.entity';
import { OrderCancelReasonDTO } from './dto/cancel-reason.dto';
import { RiderReviewEntity } from '@urbana/database/taxi/rider-review.entity';
import { SharedCustomerWalletModule } from '@urbana/customer-wallet';

@Module({
  imports: [
    RedisHelpersModule,
    DriverModule,
    CommonCouponModule,
    SharedCustomerWalletModule,
    TypeOrmModule.forFeature([
      TaxiOrderEntity,
      ServiceCategoryEntity,
      ServiceOptionEntity,
      ServiceEntity,
      CustomerEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      FleetEntity,
      FleetWalletEntity,
      FleetTransactionEntity,
      ZonePriceEntity,
      PaymentEntity,
      RiderReviewEntity,
    ]),
    RegionModule,
    HttpModule,
    FirebaseNotificationModule.register(),
    GoogleServicesModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiOrderEntity,
          CustomerEntity,
          RequestActivityEntity,
          OrderCancelReasonEntity,
        ]),
      ],
      pubSub: RedisPubSubProvider.provider(),
      dtos: [{ DTOClass: OrderDTO }],
      resolvers: [
        {
          DTOClass: RiderDTO,
          EntityClass: CustomerEntity,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          DTOClass: OrderCancelReasonDTO,
          EntityClass: OrderCancelReasonEntity,
          read: { one: { disabled: false } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
  providers: [
    OrderSubscriptionService,
    SharedOrderService,
    DriverOrderQueryService,
    OrderResolver,
    OrderService,
    ServiceService,
    SharedRiderService,
    SharedDriverService,
    SharedProviderService,
    SharedFleetService,
    RedisPubSubProvider.provider(),
    CronJobService,
  ],
  exports: [DriverOrderQueryService, SharedDriverService],
})
export class OrderModule {}
