import { Field, ID, InputType } from '@nestjs/graphql';
import { ComplaintStatus } from '@urbana/database/enums/complaint-status.enum';

@InputType()
export class ChangeTaxiSupportRequestStatusInput {
  @Field(() => ID)
  supportRequestId: number;
  status: ComplaintStatus;
}
