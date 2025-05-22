import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@urbana/database';
import { RequestActivityEntity } from '@urbana/database/taxi/request-activity.entity';
import { OrderMessageEntity } from '@urbana/database/taxi/request-message.entity';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { SharedOrderModule } from '@urbana/order/shared-order.module';
import { RedisHelpersModule } from '@urbana/redis/redis-helper.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DispatcherResolver } from './dispatcher.resolver';
import { OrderMessageDTO } from './dto/order-message.dto';
import { OrderDTO } from './dto/order.dto';
import { OrderSubscriptionService } from './order-subscription.service';
import { OrderService } from './order.service';
import { OrderCancelReasonEntity } from '@urbana/database/taxi/order-cancel-reason.entity';
import { OrderCancelReasonDTO } from './dto/order-cancel-reason.dto';
import { OrderCancelReasonInput } from './dto/order-cancel-reason.input';
import { TaxiOrderNoteEntity } from '@urbana/database/taxi/taxi-order-note.entity';
import { OrderResolver } from './order.resolver';
import { TaxiOrderNoteDTO } from './dto/taxi-order-note.dto';

@Module({
  imports: [
    SharedOrderModule,
    RedisHelpersModule,
    TypeOrmModule.forFeature([RequestActivityEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiOrderEntity,
          OrderMessageEntity,
          OrderCancelReasonEntity,
          TaxiOrderNoteEntity,
        ]),
      ],
      pubSub: RedisPubSubProvider.provider(),
      resolvers: [
        {
          EntityClass: TaxiOrderEntity,
          DTOClass: OrderDTO,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: OrderMessageEntity,
          DTOClass: OrderMessageDTO,
          pagingStrategy: PagingStrategies.OFFSET,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { disabled: true },
        },
        {
          EntityClass: OrderCancelReasonEntity,
          DTOClass: OrderCancelReasonDTO,
          CreateDTOClass: OrderCancelReasonInput,
          UpdateDTOClass: OrderCancelReasonInput,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: TaxiOrderNoteEntity,
          DTOClass: TaxiOrderNoteDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [
    DispatcherResolver,
    OrderResolver,
    OrderSubscriptionService,
    OrderService,
    RedisPubSubProvider.provider(),
  ],
})
export class OrderModule {}
