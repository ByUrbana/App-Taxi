import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ParkSpotEntity } from '@urbana/database/parking/park-spot.entity';
import { ParkSpotDTO } from './dto/park-spot.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParkOrderQueryService } from './park-order-query.service';
import { ParkOrderEntity } from '@urbana/database/parking/park-order.entity';
import { CreateParkOrderInput } from './dto/create-park-order.input';
import { ParkOrderDTO } from './dto/park-order.dto';
import { ParkingFeedbackEntity } from '@urbana/database/parking/parking-feedback.entity';
import { ParkingFeedbackParameterEntity } from '@urbana/database/parking/parking-feedback-parameter.entity';
import { ParkingService } from './parking.service';
import { ParkingResolver } from './parking.resolver';
import { ParkSpotNoteDTO } from './dto/park-spot-note.dto';
import { ParkOrderNoteDTO } from './dto/park-order-note.dto';
import { ParkOrderNoteEntity } from '@urbana/database/parking/park-order-note.entity';
import { ParkSpotNoteEntity } from '@urbana/database/parking/park-spot-note.entity';
import { CreateParkSpotNoteInput } from './dto/create-park-spot-note.input';
import { CreateParkOrderNoteInput } from './dto/create-park-order-note.input';
import { ParkingSupportRequestEntity } from '@urbana/database/parking/parking-support-request.entity';
import { ParkingSupportRequestActivityEntity } from '@urbana/database/parking/parking-support-request-activity.entity';
import { ParkOrderActivityEntity } from '@urbana/database/parking/park-order-activity.entity';
import { ParkOrderActivityDTO } from './dto/park-order-activity.dto';
import { ParkingWalletEntity } from '@urbana/database/parking/parking-wallet.entity';
import { ParkingWalletDTO } from './dto/parking-wallet.dto';
import { ParkingTransactionEntity } from '@urbana/database/parking/parking-transaction.entity';
import { ParkingTransactionDTO } from './dto/parking-transaction.dto';
import { CreateParkingTransactionInput } from './dto/create-parking-transaction.input';
import { ParkingFeedbackModule } from './modules/feedback/parking-feedback.module';
import { ParkingSupportRequestModule } from './modules/support-request/parking-support-request.module';
import { RegionModule } from '@urbana/order/region/region.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { UpdateParkSpotInput } from './dto/update-park-spot.input';
import { ParkingLoginSessionEntity } from '@urbana/database/parking/parking-login-session.entity';
import { ParkingLoginSessionDTO } from './dto/parking-login-session.dto';
import { ParkingLoginSessionService } from './parking-login-session.service';
import { ParkingCustomerNotificationEntity } from '@urbana/database/parking/parking-customer-notification.entity';

@Module({
  imports: [
    ParkingFeedbackModule,
    ParkingSupportRequestModule,
    RegionModule,
    TypeOrmModule.forFeature([CustomerEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ParkSpotEntity,
          ParkOrderEntity,
          ParkingFeedbackEntity,
          ParkingFeedbackParameterEntity,
          ParkSpotNoteEntity,
          ParkOrderNoteEntity,
          ParkingSupportRequestEntity,
          ParkingSupportRequestActivityEntity,
          ParkingCustomerNotificationEntity,
          ParkOrderActivityEntity,
          ParkingTransactionEntity,
          ParkingWalletEntity,
          ParkingLoginSessionEntity,
        ]),
      ],
      services: [ParkOrderQueryService],
      resolvers: [
        {
          EntityClass: ParkSpotEntity,
          DTOClass: ParkSpotDTO,
          UpdateDTOClass: UpdateParkSpotInput,
          guards: [JwtAuthGuard],
          enableAggregate: true,
          create: { disabled: true },
          delete: { disabled: true },
          update: { many: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          EntityClass: ParkingLoginSessionEntity,
          DTOClass: ParkingLoginSessionDTO,
          guards: [JwtAuthGuard],
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: ParkOrderEntity,
          DTOClass: ParkOrderDTO,
          CreateDTOClass: CreateParkOrderInput,
          ServiceClass: ParkOrderQueryService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: ParkOrderNoteEntity,
          DTOClass: ParkOrderNoteDTO,
          guards: [JwtAuthGuard],
          CreateDTOClass: CreateParkOrderNoteInput,
          read: { disabled: true },
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          EntityClass: ParkSpotNoteEntity,
          DTOClass: ParkSpotNoteDTO,
          guards: [JwtAuthGuard],
          CreateDTOClass: CreateParkSpotNoteInput,
          read: { one: { disabled: true } },
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: ParkOrderActivityEntity,
          DTOClass: ParkOrderActivityDTO,
          create: { disabled: true },
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ParkingWalletEntity,
          DTOClass: ParkingWalletDTO,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
        },
        {
          EntityClass: ParkingTransactionEntity,
          DTOClass: ParkingTransactionDTO,
          CreateDTOClass: CreateParkingTransactionInput,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          read: { one: { disabled: true } },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [ParkingService, ParkingResolver, ParkingLoginSessionService],
})
export class ParkingModule {}
