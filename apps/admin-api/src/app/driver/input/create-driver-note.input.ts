import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDriverNoteInput {
  @Field(() => ID)
  driverId: number;
  note: string;
}
