import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('LeaderboardItem')
export class LeaderboardItemDTO {
  @Field(() => ID)
  id: number;
  name: string;
  avatarUrl?: string;
  currency?: string;
  totalAmount?: number;
  @Field(() => Int)
  totalCount?: number;
}
