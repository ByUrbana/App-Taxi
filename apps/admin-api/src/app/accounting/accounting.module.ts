import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { ProviderTransactionEntity } from '@urbana/database/provider-transaction.entity';
import { ProviderWalletEntity } from '@urbana/database/provider-wallet.entity';

import { AccountingResolver } from './accounting.resolver';
import { AccountingService } from './accounting.service';
import { ProviderTransactionDTO } from './dto/provider-transaction.dto';
import { ProviderWalletDTO } from './dto/provider-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { ProviderTransactionInput } from './dto/provider-transaction.input';
import { RiderWalletEntity } from '@urbana/database/rider-wallet.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { ShopWalletEntity } from '@urbana/database/shop/shop-wallet.entity';
import { FleetWalletEntity } from '@urbana/database/taxi/fleet-wallet.entity';
import { ShopTransactionEntity } from '@urbana/database/shop/shop-transaction.entity';
import { RiderTransactionEntity } from '@urbana/database/rider-transaction.entity';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { FleetTransactionEntity } from '@urbana/database/taxi/fleet-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProviderTransactionEntity,
      ShopTransactionEntity,
      RiderTransactionEntity,
      DriverTransactionEntity,
      FleetTransactionEntity,
      ProviderWalletEntity,
      RiderWalletEntity,
      DriverWalletEntity,
      ShopWalletEntity,
      FleetWalletEntity,
      TaxiOrderEntity,
      DriverEntity,
      CustomerEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ProviderTransactionEntity,
          ProviderWalletEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: ProviderTransactionEntity,
          DTOClass: ProviderTransactionDTO,
          CreateDTOClass: ProviderTransactionInput,
          create: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableAggregate: true,
          guards: [JwtAuthGuard],
        },
        {
          EntityClass: ProviderWalletEntity,
          DTOClass: ProviderWalletDTO,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [AccountingService, AccountingResolver],
})
export class AccountingModule {}
