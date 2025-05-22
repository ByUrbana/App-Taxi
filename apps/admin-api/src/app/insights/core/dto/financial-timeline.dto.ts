import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('FinancialTimeline')
export class FinancialTimeline {
  amount: number;
  @Field(() => Date, {
    description: 'Any date within the range of revenue interval.',
  })
  anyDate: Date;
  dateString: string;
}
