import { DynamicModule, Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DriverModule } from '../driver/driver.module';
import { OrderModule } from '../order/order.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SMSModule } from '@urbana/sms/sms.module';
import { RedisHelpersModule } from '@urbana/redis/redis-helper.module';
import { getConfig } from 'license-verify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverDocumentEntity } from '@urbana/database/taxi/driver-document.entity';

@Module({})
export class AuthModule {
  static async register(): Promise<DynamicModule> {
    const modules = [
      TypeOrmModule.forFeature([DriverDocumentEntity]),
      DriverModule,
      OrderModule,
      PassportModule,
      SMSModule,
      RedisHelpersModule,
      JwtModule.register({
        secret: 'secret_driver',
      }),
    ];
    let providers = [];
    const _config = await getConfig(process.env.NODE_ENV ?? 'prod');
    if (_config != null) {
      Logger.log('Firebase Auth Module initialized');
      providers = [AuthService, JwtStrategy, AuthResolver];
    }
    return {
      module: AuthModule,
      imports: modules,
      providers: providers,
    };
  }
}
