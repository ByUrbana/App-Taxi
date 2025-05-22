import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCancelReasonEntity } from '@urbana/database/taxi/order-cancel-reason.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { CancelReasonInsightsService } from './cancel-reason-insights.service';
import { CancelReasonInsightsResolver } from './cancel-reason-insights.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderCancelReasonEntity, TaxiOrderEntity]),
  ],
  providers: [CancelReasonInsightsService, CancelReasonInsightsResolver],
})
export class CancelReasonInsightsModule {}
