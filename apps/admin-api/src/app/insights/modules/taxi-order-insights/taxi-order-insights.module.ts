import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiOrderEntity])],
})
export class TaxiOrderInsightsModule {}
