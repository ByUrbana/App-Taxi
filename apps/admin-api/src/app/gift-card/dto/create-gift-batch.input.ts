import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGiftBatchInput {
  name: string;
  currency: string;
  amount: number;
  availableFrom?: Date;
  expireAt?: Date;
  @Field(() => Int)
  quantity: number;
}
