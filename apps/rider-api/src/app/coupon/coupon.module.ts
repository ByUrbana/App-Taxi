import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonCouponModule } from '@urbana/coupon';

import { CouponEntity } from '@urbana/database/coupon.entity';
import { PaymentEntity } from '@urbana/database/payment.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { SharedOrderModule } from '@urbana/order/shared-order.module';
import { OrderModule } from '../order/order.module';
import { CouponResolver } from './coupon.resolver';
import { CouponService } from './coupon.service';
import { SharedCustomerWalletModule } from '@urbana/customer-wallet';

@Module({
  imports: [
    forwardRef(() => OrderModule),
    SharedOrderModule,
    CommonCouponModule,
    TypeOrmModule.forFeature([TaxiOrderEntity, CouponEntity, PaymentEntity]),
    // NestjsQueryGraphQLModule.forFeature({
    //   imports: [NestjsQueryTypeOrmModule.forFeature([CouponEntity])],
    //   resolvers: [
    //     {
    //       EntityClass: CouponEntity,
    //       DTOClass: CouponDTO,
    //       create: { disabled: true },
    //       read: { disabled: true },
    //       delete: { disabled: true },
    //       update: { disabled: true },
    //       guards: [GqlAuthGuard],
    //       pagingStrategy: PagingStrategies.NONE,
    //     },
    //   ],
    // }),
  ],
  providers: [CouponService, CouponResolver],
  exports: [CouponService],
})
export class CouponModule {}
