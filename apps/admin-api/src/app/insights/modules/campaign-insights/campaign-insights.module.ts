import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignCodeEntity } from '@urbana/database/campaign-code.entity';
import { CampaignEntity } from '@urbana/database/campaign.entity';
import { CampaignInsightsService } from './campaign-insights.service';
import { CampaignInsightsResolver } from './campaign-insights.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity, CampaignCodeEntity])],
  providers: [CampaignInsightsService, CampaignInsightsResolver],
})
export class CampaignInsightsModule {}
