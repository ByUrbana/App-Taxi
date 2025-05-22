import { IDField } from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { MediaDTO } from '../../upload/media.dto';
import { ServiceOptionDTO } from '../../service/dto/service-option.dto';

@ObjectType('ServiceWithCost')
export class ServiceWithCostDTO {
  @IDField(() => ID)
  id: number;
  name: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int, { nullable: true })
  personCapacity?: number;
  cost: number;
  media: MediaDTO;
  options: ServiceOptionDTO[];
}
