import { ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';
import { DevicePlatform } from '@urbana/database/enums/device-platform.enum';
import { DeviceType } from '@urbana/database/enums/device-type.enum';

@ObjectType('ShopSession')
export class ShopSessionDTO {
  @IDField(() => ID)
  id: number;
  createdAt: Date;
  deviceName?: string;
  ipLocation?: string;
  lastActivityAt?: Date;
  @FilterableField(() => ID)
  shopId: number;
  @FilterableField(() => AppType)
  appType: AppType;
  devicePlatform: DevicePlatform;
  deviceType: DeviceType;
}
