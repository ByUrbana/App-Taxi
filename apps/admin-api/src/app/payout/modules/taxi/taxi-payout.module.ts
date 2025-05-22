import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { TaxiPayoutSessionEntity } from '@urbana/database/taxi/taxi-payout-session.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { TaxiPayoutService } from './taxi-payout.service';
import { TaxiPayoutResolver } from './taxi-payout.resolver';
import { OperatorModule } from '../../../operator/operator.module';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { TaxiPayoutSessionPayoutMethodDetailEntity } from '@urbana/database/taxi/taxi-payout-session-payout-method-detail.entity';
import { TaxiPayoutSessionPayoutMethodDetailDTO } from './dto/taxi-payout-session-payout-method-detail.dto';
import { TaxiPayoutSessionDTO } from './dto/taxi-payout-session.dto';
import { UpdatePayoutSessionInput } from '../../dto/update-payout-session.input';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

@Module({
  imports: [
    OperatorModule,
    TypeOrmModule.forFeature([
      TaxiPayoutSessionEntity,
      DriverTransactionEntity,
      DriverWalletEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          TaxiPayoutSessionEntity,
          TaxiPayoutSessionPayoutMethodDetailEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: TaxiPayoutSessionDTO,
          EntityClass: TaxiPayoutSessionEntity,
          UpdateDTOClass: UpdatePayoutSessionInput,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          DTOClass: TaxiPayoutSessionPayoutMethodDetailDTO,
          EntityClass: TaxiPayoutSessionPayoutMethodDetailEntity,
          read: { disabled: true },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [TaxiPayoutService, TaxiPayoutResolver],
  exports: [TaxiPayoutResolver],
})
export class TaxiPayoutModule {}
