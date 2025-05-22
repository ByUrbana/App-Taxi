import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DevicePlatform } from '@urbana/database/enums/device-platform.enum';

@ObjectType('PlatformDistribution')
export class PlatformDistributionDTO {
  @Field(() => DevicePlatform)
  platform: DevicePlatform;
  @Field(() => Int)
  count: number;
}
