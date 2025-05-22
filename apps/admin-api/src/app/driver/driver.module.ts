import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { SharedDriverService } from '@urbana/order/shared-driver.service';
import { RedisHelpersModule } from '@urbana/redis/redis-helper.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriverResolver } from './driver.resolver';
import { DriverService } from './driver.service';
import { DriverTransactionDTO } from './dto/driver-transaction.dto';
import { DriverWalletDTO } from './dto/driver-wallet.dto';
import { DriverDTO } from './dto/driver.dto';
import { UpdateDriverInput } from './dto/driver.input';
import { OperatorEntity } from '@urbana/database/operator.entity';
import { DriverTransactionInput } from './dto/driver-transaction.input';
import { DriverSessionEntity } from '@urbana/database/taxi/driver-session.entity';
import { DriverNoteEntity } from '@urbana/database/taxi/driver-note.entity';
import { DriverNoteDTO } from './dto/driver-note.dto';
import { CreateDriverNoteInput } from './input/create-driver-note.input';
import { DriverSessionDTO } from './dto/driver-session.dto';
import { DriverServicesServiceEntity } from '@urbana/database/taxi/driver-services-service.entity';
import { DriverServicesServiceDTO } from './dto/driver-services-service.dto';

@Module({
  imports: [
    RedisHelpersModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          DriverEntity,
          DriverTransactionEntity,
          DriverWalletEntity,
          OperatorEntity,
          DriverNoteEntity,
          DriverSessionEntity,
          DriverServicesServiceEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: DriverEntity,
          DTOClass: DriverDTO,
          UpdateDTOClass: UpdateDriverInput,
          CreateDTOClass: UpdateDriverInput,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: DriverServicesServiceEntity,
          DTOClass: DriverServicesServiceDTO,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          EntityClass: DriverNoteEntity,
          DTOClass: DriverNoteDTO,
          CreateDTOClass: CreateDriverNoteInput,
          guards: [JwtAuthGuard],
          create: { many: { disabled: true } },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
        },
        {
          EntityClass: DriverWalletEntity,
          DTOClass: DriverWalletDTO,
          create: { disabled: true },
          read: { one: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: DriverSessionEntity,
          DTOClass: DriverSessionDTO,
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
          enableTotalCount: true,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { many: { disabled: true } },
        },
        {
          EntityClass: DriverTransactionEntity,
          DTOClass: DriverTransactionDTO,
          CreateDTOClass: DriverTransactionInput,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [DriverResolver, DriverService, SharedDriverService],
})
export class DriverModule {}
