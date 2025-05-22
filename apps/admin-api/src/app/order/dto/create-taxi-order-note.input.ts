import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaxiOrderNoteInput {
  @Field(() => ID)
  orderId!: number;
  note!: string;
}
