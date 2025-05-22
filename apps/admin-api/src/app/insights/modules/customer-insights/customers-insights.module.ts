import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { CustomerSessionEntity } from '@urbana/database/customer-session.entity';
import { ProviderTransactionEntity } from '@urbana/database/provider-transaction.entity';
import { CustomersInsightsService } from './customers-insights.service';
import { CustomersInsightsResolver } from './customers-insights.resolver';
import { RiderTransactionEntity } from '@urbana/database/rider-transaction.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { ShopOrderEntity } from '@urbana/database/shop/shop-order.entity';
import { ParkOrderEntity } from '@urbana/database/parking/park-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      CustomerSessionEntity,
      ProviderTransactionEntity,
      RiderTransactionEntity,
      TaxiOrderEntity,
      ShopOrderEntity,
      ParkOrderEntity,
    ]),
  ],
  providers: [CustomersInsightsService, CustomersInsightsResolver],
  exports: [],
})
export class CustomerInsightsModule {}
