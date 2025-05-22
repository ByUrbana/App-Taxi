import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSosReasonInput {
  name?: string;
  isActive?: boolean;
}
