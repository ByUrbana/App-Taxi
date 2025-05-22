import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DriverToDriverDocumentInput {
  @Field(() => ID)
  driverId: number;

  @Field(() => ID)
  driverDocumentId: number;

  @Field(() => ID)
  mediaId: number;

  @Field(() => ID)
  retentionPolicyId?: number;

  expiresAt?: Date;
}
