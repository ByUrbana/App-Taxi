import { ObjectType } from '@nestjs/graphql';

@ObjectType('RevenueExpensePair')
export class RevenueExpensePair {
  revenue: number;
  expense: number;
  anyDate: Date;
  dateString: string;
}
