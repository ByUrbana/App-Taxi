import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTransactionEntity } from '@urbana/database/taxi/driver-transaction.entity';
import { DriverWalletEntity } from '@urbana/database/taxi/driver-wallet.entity';
import { DriverEntity } from '@urbana/database/taxi/driver.entity';
import { SharedDriverService } from '@urbana/order/shared-driver.service';
import { DriverRedisService } from './driver-redis.service';
import { OrderRedisService } from './order-redis.service';
import { AuthRedisService } from '../sms/auth-redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
    ]),
  ],
  providers: [
    DriverRedisService,
    OrderRedisService,
    SharedDriverService,
    AuthRedisService,
  ],
  exports: [DriverRedisService, OrderRedisService, AuthRedisService],
})
export class RedisHelpersModule {}
