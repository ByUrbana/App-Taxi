import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@urbana/database';
import { CarColorEntity } from '@urbana/database/taxi/car-color.entity';
import { CarModelEntity } from '@urbana/database/taxi/car-model.entity';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { ProviderTransactionEntity } from '@urbana/database/provider-transaction.entity';
import { ProviderWalletEntity } from '@urbana/database/provider-wallet.entity';
import { RegionEntity } from '@urbana/database/taxi/region.entity';
import { ServiceCategoryEntity } from '@urbana/database/taxi/service-category.entity';
import { SharedDriverService } from '@urbana/order/shared-driver.service';
import { DriverNotificationService } from '@urbana/order/firebase-notification-service/driver-notification.service';
import { GoogleServicesModule } from '@urbana/order/google-services.module';
import { SharedProviderService } from '@urbana/order/shared-provider.service';
import { RegionModule } from '@urbana/order/region.module';
import { RedisHelpersModule } from '@urbana/redis/redis-helper.module';

import { GqlAuthGuard } from '../auth/access-token.guard';
import { RiderModule } from '../rider/rider.module';
import { ServiceModule } from '../service/service.module';
import { CarColorDTO } from './dto/car-color.dto';
import { CarModelDTO } from './dto/car-model.dto';
import { DriverDTO } from './dto/driver.dto';
import { OrderDTO } from './dto/order.dto';
import { OrderResolver } from './order.resolver';
import { RiderOrderService } from './rider-order.service';
import { FeedbackEntity } from '@urbana/database/taxi/feedback.entity';
import { OrderSubscriptionService } from './order-subscription.service';
import { MediaEntity } from '@urbana/database/media.entity';
import { RequestActivityEntity } from '@urbana/database/taxi/request-activity.entity';
import { SharedOrderModule } from '@urbana/order/shared-order.module';
import { RiderNotificationService } from '@urbana/order/firebase-notification-service/rider-notification.service';
import { CouponModule } from '../coupon/coupon.module';
import { FeedbackParameterEntity } from '@urbana/database/taxi/feedback-parameter.entity';
import { FeedbackParameterDTO } from './dto/feedback-parameter.dto';
import { ServiceOptionEntity } from '@urbana/database/taxi/service-option.entity';
import { UpdateOrderInput } from './dto/update-order.input';
import { RiderOrderQueryService } from './rider-order.query-service';
import { OrderRedisService } from '@urbana/redis/order-redis.service';
import { CommonCouponModule } from '@urbana/coupon';
import { ZonePriceEntity } from '@urbana/database/taxi/zone-price.entity';
import { PaymentEntity } from '@urbana/database/payment.entity';
import { HttpModule } from '@nestjs/axios';
import { OrderCancelReasonEntity } from '@urbana/database/taxi/order-cancel-reason.entity';
import { OrderCancelReasonDTO } from './dto/cancel-reason.dto';
import { SharedCustomerWalletModule } from '@urbana/customer-wallet';
import { ShopOrderCartEntity } from '@urbana/database/shop/shop-order-cart.entity';
import { ShopOrderCartDTO } from './dto/shop-order-cart.dto';
import { ShopEntity } from '@urbana/database/shop/shop.entity';
import { ShopDTO } from './dto/shop.dto';
import { TaxiOrderShopEntity } from '@urbana/database/taxi/taxi-order-shop.entity';
import { TaxiOrderShopDTO } from './dto/taxi-order-shop.dto';
import { DriverServicesServiceDTO } from './dto/driver-services-service.dto';
import { DriverServicesServiceEntity } from '@urbana/database/taxi/driver-services-service.entity';

@Module({
  imports: [
    SharedCustomerWalletModule,
    TypeOrmModule.forFeature([
      TaxiOrderEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      FeedbackEntity,
      RequestActivityEntity,
      FeedbackParameterEntity,
      ServiceOptionEntity,
      ZonePriceEntity,
      PaymentEntity,
    ]),
    HttpModule,
    CommonCouponModule,
    GoogleServicesModule,
    ServiceModule,
    RiderModule,
    RegionModule,
    forwardRef(() => CouponModule),
    RedisHelpersModule,
    SharedOrderModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        SharedCustomerWalletModule,

        RedisHelpersModule,
        NestjsQueryTypeOrmModule.forFeature([
          TaxiOrderEntity,
          DriverEntity,
          CarColorEntity,
          CarModelEntity,
          RegionEntity,
          ServiceCategoryEntity,
          MediaEntity,
          FeedbackParameterEntity,
          RequestActivityEntity,
          FeedbackEntity,
          PaymentEntity,
          OrderCancelReasonEntity,
          ShopOrderCartEntity,
          ShopEntity,
          TaxiOrderShopEntity,
          DriverServicesServiceEntity,
        ]),
        CommonCouponModule,
        SharedOrderModule,
        HttpModule,
      ],
      pubSub: RedisPubSubProvider.provider(),
      services: [
        RiderOrderQueryService,
        RiderOrderService,
        OrderRedisService,
        DriverNotificationService,
      ],
      resolvers: [
        {
          EntityClass: TaxiOrderEntity,
          DTOClass: OrderDTO,
          UpdateDTOClass: UpdateOrderInput,
          ServiceClass: RiderOrderQueryService,
          //Service: RiderOrderQueryService,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: DriverEntity,
          DTOClass: DriverDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: DriverServicesServiceEntity,
          DTOClass: DriverServicesServiceDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: TaxiOrderShopEntity,
          DTOClass: TaxiOrderShopDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: ShopOrderCartEntity,
          DTOClass: ShopOrderCartDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: ShopEntity,
          DTOClass: ShopDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: CarModelEntity,
          DTOClass: CarModelDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: CarColorEntity,
          DTOClass: CarColorDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: FeedbackParameterEntity,
          DTOClass: FeedbackParameterDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
        },
        {
          EntityClass: OrderCancelReasonEntity,
          DTOClass: OrderCancelReasonDTO,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
        },
      ],
    }),
  ],
  providers: [
    OrderSubscriptionService,
    SharedProviderService,
    OrderResolver,
    RiderOrderService,
    SharedDriverService,
    DriverNotificationService,
    RiderNotificationService,
    RedisPubSubProvider.provider(),
  ],
  exports: [RiderOrderService],
})
export class OrderModule {}
