import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';

@ObjectType('CustomerLoginPerApp')
export class CustomersPerAppDTO {
  @Field(() => AppType)
  app: AppType;
  @Field(() => Int)
  count: number;
}
