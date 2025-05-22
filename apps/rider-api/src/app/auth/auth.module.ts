import { DynamicModule, Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SMSModule } from '@urbana/sms/sms.module';

import { RiderModule } from '../rider/rider.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './access-token.strategy';
import { RedisHelpersModule } from '@urbana/redis/redis-helper.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSessionEntity } from '@urbana/database/customer-session.entity';
import { SharedShopModule } from '@urbana/shop';
import { SharedCustomerWalletModule } from '@urbana/customer-wallet';
import { getConfig } from 'license-verify';

@Module({})
export class AuthModule {
  static async register(): Promise<DynamicModule> {
    const modules = [
      SharedCustomerWalletModule,
      RiderModule,
      PassportModule,
      SMSModule,
      SharedShopModule,
      RedisHelpersModule,
      TypeOrmModule.forFeature([CustomerSessionEntity]),
      JwtModule.register({
        secret: 'secret_rider',
      }),
    ];
    let providers = [];
    const config = await getConfig(process.env.NODE_ENV ?? 'prod');
    Logger.log(config, 'AuthModule.register.config');
    if (config) {
      providers = [AuthService, AccessTokenStrategy, AuthResolver];
    }
    return {
      module: AuthModule,
      imports: modules,
      providers: providers,
    };
  }
}
