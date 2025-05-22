import { InputType } from '@nestjs/graphql';
import { SOSStatus } from '@urbana/database/enums/sos-status.enum';

@InputType()
export class UpdateSosInput {
  status: SOSStatus;
}
