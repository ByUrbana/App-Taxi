import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { RedisPubSubProvider } from '@urbana/database';
import { OrderMessageEntity } from '@urbana/database/taxi/request-message.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { FirebaseNotificationModule } from '@urbana/order/firebase-notification-service/firebase-notification-service.module';
import { RiderNotificationService } from '@urbana/order/firebase-notification-service/rider-notification.service';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';

import { OrderModule } from '../order/order.module';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { ChatSubscriptionService } from './chat.subscription.service';
import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderMessageInput } from './dto/order-message.input';

@Module({
  imports: [
    OrderModule,
    FirebaseNotificationModule.register(),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          OrderMessageEntity,
          TaxiOrderEntity,
        ]),
      ],
      services: [ChatService, RiderNotificationService],
      pubSub: RedisPubSubProvider.provider(),
      resolvers: [
        {
          EntityClass: OrderMessageEntity,
          DTOClass: OrderMessageDTO,
          CreateDTOClass: OrderMessageInput,
          ServiceClass: ChatService,
          pagingStrategy: PagingStrategies.NONE,
          create: { many: { disabled: true } },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [
    ChatSubscriptionService,
    ChatResolver,
    RedisPubSubProvider.provider(),
  ],
})
export class ChatModule {}
