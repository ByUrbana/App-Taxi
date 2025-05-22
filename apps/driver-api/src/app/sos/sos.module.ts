import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@urbana/database';
import { OperatorEntity } from '@urbana/database/operator.entity';
import { SOSEntity } from '@urbana/database/taxi/sos.entity';
import { SOSResolver } from './sos.resolver';
import { SOSService } from './sos.service';

@Module({
  imports: [TypeOrmModule.forFeature([SOSEntity, OperatorEntity])],
  providers: [SOSService, SOSResolver, RedisPubSubProvider.provider()],
})
export class SOSModule {}
