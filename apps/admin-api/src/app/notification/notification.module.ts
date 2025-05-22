import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@urbana/database';
import { AdminNotificationEntity } from '@urbana/database/admin-notification.entity';
import { NotificationSubscriptionService } from './notification-subscription.service';
import { NotificationResolver } from './notification.resolver';
import { NotiifcationService } from './notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminNotificationEntity])],
  providers: [
    NotiifcationService,
    NotificationResolver,
    NotificationSubscriptionService,
    RedisPubSubProvider.provider(),
  ],
  exports: [NotiifcationService],
})
export class NotificationModule {}
