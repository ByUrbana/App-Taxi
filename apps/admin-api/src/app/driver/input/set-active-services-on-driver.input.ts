import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SetActiveServicesOnDriverInput {
  @Field(() => ID)
  driverId: number;
  @Field(() => [ID])
  serviceIds: number[];
}
