import { IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { ServiceWithCostDTO } from './service-with-cost.dto';

@ObjectType('ServiceCategoryWithCost')
export class ServiceCategoryWithCostDTO {
  @IDField(() => ID)
  id!: number;
  name!: string;
  services: ServiceWithCostDTO[];
}
