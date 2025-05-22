import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { RewardAppType } from '@urbana/database/enums/reward-app-type';
import { RewardBeneficiary } from '@urbana/database/enums/reward-beneficiary';
import { RewardEvent } from '@urbana/database/enums/reward-event';

@ObjectType('Reward')
export class RewardDTO {
  @IDField(() => ID)
  id: number;
  title: string;
  startDate?: Date;
  endDate?: Date;
  appType!: RewardAppType;
  beneficiary!: RewardBeneficiary;
  event!: RewardEvent;
  creditGift!: number;
  tripFeePercentGift?: number;
  creditCurrency?: string;
  conditionTripCountsLessThan?: number;
  conditionUserNumberFirstDigits?: string[];
}
