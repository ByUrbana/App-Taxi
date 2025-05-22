import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  OffsetConnection,
} from '@ptc-org/nestjs-query-graphql';
import { CampaignCodeDTO } from './campaign-code.dto';
import { AppType } from '@urbana/database/enums/app-type.enum';

@ObjectType('Campaign')
@OffsetConnection('codes', () => CampaignCodeDTO, { enableAggregate: true })
export class CampaignDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField()
  name: string;
  description?: string;
  @Field(() => [AppType])
  appType: AppType[];
  @Field(() => Int)
  manyUsersCanUse!: number;
  @Field(() => Int)
  manyTimesUserCanUse!: number;
  minimumCost!: number;
  maximumCost!: number;
  startAt!: Date;
  expireAt?: Date;
  currency!: string;
  discountPercent!: number;
  discountFlat!: number;
  isEnabled!: boolean;
  isFirstTravelOnly!: boolean;
}
