import { ObjectType } from '@nestjs/graphql';

@ObjectType('CalculateDeliveryFee')
export class CalculateDeliveryFeeDTO {
  batchDeliveryFee: number;
  batchDeliveryDuration: number;
  splitDeliveryFee: number;
}
