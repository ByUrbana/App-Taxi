import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { DriversInsightsResolver } from './drivers-insights.resolver';
import { DriversInsightsService } from './drivers-insights.service';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverTransactionEntity, DriverEntity])],
  providers: [DriversInsightsResolver, DriversInsightsService],
})
export class DriversInsightsModule {}
