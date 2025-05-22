import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSosReasonInput {
  @Field()
  name: string;
}
