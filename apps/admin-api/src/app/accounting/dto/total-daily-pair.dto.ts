import { ObjectType } from '@nestjs/graphql';

@ObjectType('TotalDailyPair')
export class TotalDailyPairDTO {
  total: number;
  daily: number;
}
