import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponEntity } from '@urbana/database/coupon.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';

import { CommonCouponService } from './common-coupon.service';
import { CommonGiftCardService } from './common-gift-card.service';
import { GiftCodeEntity } from '@urbana/database/gift-code.entity';
import { SharedRiderService } from '@urbana/order/shared-rider.service';
import { SharedDriverService } from '@urbana/order/shared-driver.service';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { RiderWalletEntity } from '@urbana/database/rider-wallet.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { RiderTransactionEntity } from '@urbana/database/rider-transaction.entity';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { SharedCustomerWalletModule } from '@urbana/customer-wallet';

@Module({
  imports: [
    SharedCustomerWalletModule,
    TypeOrmModule.forFeature([
      TaxiOrderEntity,
      CustomerEntity,
      DriverEntity,
      CouponEntity,
      RiderWalletEntity,
      DriverWalletEntity,
      RiderTransactionEntity,
      DriverTransactionEntity,
      GiftCodeEntity,
    ]),
  ],
  providers: [
    CommonCouponService,
    CommonGiftCardService,
    SharedRiderService,
    SharedDriverService,
  ],
  exports: [CommonCouponService, CommonGiftCardService],
})
export class CommonCouponModule {}
