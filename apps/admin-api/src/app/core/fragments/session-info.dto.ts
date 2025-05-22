import { ObjectType } from '@nestjs/graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';
import { DevicePlatform } from '@urbana/database/enums/device-platform.enum';
import { DeviceType } from '@urbana/database/enums/device-type.enum';

@ObjectType('SessionInfo')
export class SessionInfoDTO {
  createdAt!: Date;

  lastActivityAt?: Date;

  ip?: string;

  ipLocation?: string;

  deviceName?: string;

  appType!: AppType;

  devicePlatform!: DevicePlatform;

  deviceType!: DeviceType;

  token!: string;
}
