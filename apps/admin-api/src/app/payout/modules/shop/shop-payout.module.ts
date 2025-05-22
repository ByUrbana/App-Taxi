import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopPayoutSessionEntity } from '@urbana/database/shop/shop-payout-session.entity';
import { ShopPayoutService } from './shop-payout.service';
import { ShopPayoutResolver } from './shop-payout.resolver';
import { OperatorModule } from '../../../operator/operator.module';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ShopPayoutSessionPayoutMethodDetailEntity } from '@urbana/database/shop/shop-payout-session-payout-method-detail.entity';
import { ShopPayoutSessionPayoutMethodDetailDTO } from './dto/shop-payout-session-payout-method-detail.dto';
import { ShopPayoutSessionDTO } from './dto/shop-payout-session.dto';
import { UpdatePayoutSessionInput } from '../../dto/update-payout-session.input';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ShopTransactionEntity } from '@urbana/database/shop/shop-transaction.entity';
import { ShopWalletEntity } from '@urbana/database/shop/shop-wallet.entity';

@Module({
  imports: [
    OperatorModule,
    TypeOrmModule.forFeature([
      ShopPayoutSessionEntity,
      ShopTransactionEntity,
      ShopWalletEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          ShopPayoutSessionEntity,
          ShopPayoutSessionPayoutMethodDetailEntity,
        ]),
      ],
      resolvers: [
        {
          DTOClass: ShopPayoutSessionDTO,
          EntityClass: ShopPayoutSessionEntity,
          UpdateDTOClass: UpdatePayoutSessionInput,
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [JwtAuthGuard],
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
        },
        {
          DTOClass: ShopPayoutSessionPayoutMethodDetailDTO,
          EntityClass: ShopPayoutSessionPayoutMethodDetailEntity,
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
  providers: [ShopPayoutService, ShopPayoutResolver],
  exports: [ShopPayoutResolver],
})
export class ShopPayoutModule {}
