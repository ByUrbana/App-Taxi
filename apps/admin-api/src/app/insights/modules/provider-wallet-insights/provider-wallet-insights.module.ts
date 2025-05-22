import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderTransactionEntity } from '@urbana/database/provider-transaction.entity';
import { ProviderWalletEntity } from '@urbana/database/provider-wallet.entity';
import { ProviderWalletInsightsService } from './provider-wallet-insights.service';
import { ProviderWalletInsightsResolver } from './provider-wallet-insights.resolver';
import { InsightsHelperService } from '../../core/services/insights-helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderWalletEntity, ProviderTransactionEntity]),
  ],
  providers: [
    ProviderWalletInsightsService,
    ProviderWalletInsightsResolver,
    InsightsHelperService,
  ],
})
export class ProviderWalletInsightsModule {}
