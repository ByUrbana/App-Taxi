import { Field, Float, ObjectType } from '@nestjs/graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';

@ObjectType('RevenuePerApp')
export class RevenuePerApp {
  app: AppType;
  @Field(() => Float)
  revenue: number;
  @Field(() => Date, {
    description: 'Any date within the range of revenue interval.',
  })
  date: Date;
}
