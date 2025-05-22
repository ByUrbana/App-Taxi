import { ObjectType } from '@nestjs/graphql';
import { ProviderExpenseType } from '@urbana/database/enums/provider-expense-type.enum';

@ObjectType('ProviderExpenseBreakdownRecord')
export class ProviderExpenseBreakdownRecord {
  expenseType: ProviderExpenseType;
  value: number;
  dateString: string;
  anyDate: Date;
}
