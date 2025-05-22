import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopTransactionEntity } from '@urbana/database/shop/shop-transaction.entity';
import { ShopsInsightsResolver } from './shops-insights.resolver';
import { ShopsInsightsService } from './shops-insights.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopTransactionEntity])],
  providers: [ShopsInsightsResolver, ShopsInsightsService],
})
export class ShopsInsightsModule {}
