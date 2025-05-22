import {
  Field,
  Float,
  InputType,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';

@InputType()
export class CreateCampaignInput {
  name!: string;
  description?: string;
  @Field(() => Int)
  manyUsersCanUse!: number;
  @Field(() => Int)
  manyTimesUserCanUse!: number;
  minimumCost?: number;
  maximumCost?: number;
  startAt?: Date;
  expireAt?: Date;
  @Field(() => Float)
  discountPercent?: number;
  discountFlat?: number;
  isFirstTravelOnly!: boolean;
  @Field(() => Int)
  codesCount!: number;
  sendSMS!: boolean;
  smsText?: string;
  sendEmail!: boolean;
  emailSubject?: string;
  emailText?: string;
  sendPush!: boolean;
  pushTitle?: string;
  pushText?: string;
  sendAt?: Date;
  targetUsers: CampaignTargetSegmentCriteria[];
}

@InputType()
export class CampaignTargetSegmentCriteria {
  appType: AppType;
  @Field(() => Int)
  lastDays: number;
  type: CampaignCriteriaOrdersType;
  @Field(() => Float)
  value: number;
}

export enum CampaignCriteriaOrdersType {
  OrderCountMoreThan = 'OrderCountMoreThan',
  OrderCountLessThan = 'OrderCountLessThan',
  PurchaseAmountMoreThan = 'PurchaseAmountMoreThan',
  PurchaseAmountLessThan = 'PurchaseAmountLessThan',
}

registerEnumType(CampaignCriteriaOrdersType, {
  name: 'CampaignCriteriaOrdersType',
});
