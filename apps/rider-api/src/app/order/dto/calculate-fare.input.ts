import { Field, InputType, Int } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { TaxiOrderType } from '@urbana/database/taxi/enums/taxi-order-type.enum';

@InputType()
export class CalculateFareInput {
  points!: Point[];
  @Field(() => TaxiOrderType, { defaultValue: TaxiOrderType.Ride })
  orderType: TaxiOrderType;
  twoWay?: boolean;
  couponCode?: string;
  selectedOptionIds?: string[];
  @Field(() => Int)
  waitTime?: number;
}
