import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { RiderDTO } from './dto/rider.dto';
import { UpdateRiderInput } from './dto/update-rider.input';
import { GqlAuthGuard } from '../auth/access-token.guard';
import { RiderWalletEntity } from '@urbana/database/rider-wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedRiderService } from '@urbana/order/shared-rider.service';
import { RiderTransactionEntity } from '@urbana/database/rider-transaction.entity';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      DriverEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
    ]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([CustomerEntity])],
      resolvers: [
        {
          EntityClass: CustomerEntity,
          DTOClass: RiderDTO,
          UpdateDTOClass: UpdateRiderInput,
          read: { many: { disabled: true } },
          create: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [SharedRiderService],
  exports: [SharedRiderService],
})
export class RiderModule {}
