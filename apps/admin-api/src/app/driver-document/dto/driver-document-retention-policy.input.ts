import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DriverDocumentRetentionPolicyInput {
  title: string;
  @Field(() => Int)
  deleteAfterDays: number;
  @Field(() => ID)
  driverDocumentId: number;
}
