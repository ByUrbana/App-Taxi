import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IDField, UnPagedRelation } from '@ptc-org/nestjs-query-graphql';
import { DriverDocumentRetentionPolicyDTO } from './driver-document-retention-policy.dto';

@ObjectType('DriverDocument')
@UnPagedRelation('retentionPolicies', () => DriverDocumentRetentionPolicyDTO)
export class DriverDocumentDTO {
  @IDField(() => ID)
  id: number;
  title: string;
  isEnabled: boolean;
  isRequired: boolean;
  hasExpiryDate: boolean;
  @Field(() => Int)
  notificationDaysBeforeExpiry: number;
  @Field(() => Int)
  numberOfImages: number;
}
