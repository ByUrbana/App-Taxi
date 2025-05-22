import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackParameterEntity } from '@urbana/database/taxi/feedback-parameter.entity';
import { TaxiFeedbackInsightsResolver } from './taxi-feedback-insights.resolver';
import { TaxiFeedbackInsightsService } from './taxi-feedback-insights.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackParameterEntity])],
  providers: [TaxiFeedbackInsightsService, TaxiFeedbackInsightsResolver],
})
export class TaxiFeedbackInsightsModule {}
