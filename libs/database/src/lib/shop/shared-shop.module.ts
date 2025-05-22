import { Module } from '@nestjs/common';
import { SharedShopService } from './shared-shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from '../entities/shop/shop.entity';
import { DeliveryFeeService } from './delivery-fee.service';
import { RiderAddressEntity } from '../entities/rider-address.entity';
import { ServiceEntity } from '@urbana/database/taxi/service.entity';
import { GoogleServicesModule } from '@urbana/order/google-services/google-services.module';
import { SharedOrderModule } from '@urbana/order/shared-order.module';
import { ProductEntity } from '@urbana/database/shop/product.entity';

@Module({
  imports: [
    GoogleServicesModule,
    SharedOrderModule,

    TypeOrmModule.forFeature([
      ShopEntity,
      RiderAddressEntity,
      ServiceEntity,
      ProductEntity,
    ]),
  ],
  providers: [SharedShopService, DeliveryFeeService],
  exports: [SharedShopService, DeliveryFeeService],
})
export class SharedShopModule {}
