import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from '@urbana/database/taxi/feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksResolver } from './feedbacks.resolver';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity, DriverEntity])],
  providers: [FeedbacksService, FeedbacksResolver],
  exports: [],
})
export class FeedbacksModule {}
