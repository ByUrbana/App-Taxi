import { Module } from '@nestjs/common';
import { ParkingInsightsService } from './parking-insights.service';
import { ParkingInsightsResolver } from './parking-insights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkSpotEntity } from '@urbana/database/parking/park-spot.entity';
import { ParkingWalletEntity } from '@urbana/database/parking/parking-wallet.entity';
import { ParkingTransactionEntity } from '@urbana/database/parking/parking-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParkSpotEntity,
      ParkingWalletEntity,
      ParkingTransactionEntity,
    ]),
  ],
  providers: [ParkingInsightsService, ParkingInsightsResolver],
})
export class ParkingInsightsModule {}
