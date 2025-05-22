import { ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@urbana/database/enums/order-status.enum';

@ObjectType()
export class RequestResultItem {
  time: string;
  count: number;
  status: OrderStatus;
}
