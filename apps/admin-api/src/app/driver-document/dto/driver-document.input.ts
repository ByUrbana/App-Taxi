import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DriverDocumentInput {
  title: string;
  isEnabled: boolean;
  isRequired: boolean;
  hasExpiryDate: boolean;
  @Field(() => Int)
  notificationDaysBeforeExpiry: number;
  @Field(() => Int)
  numberOfImages: number;
}
