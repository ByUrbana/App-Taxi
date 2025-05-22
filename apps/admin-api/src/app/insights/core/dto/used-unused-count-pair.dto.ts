import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsedUnusedCountPairDTO {
  used: number;
  unused: number;
}
