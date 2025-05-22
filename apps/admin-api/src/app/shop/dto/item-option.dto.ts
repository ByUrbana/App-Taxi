import { ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('ItemOption')
export class ItemOptionDTO {
  @IDField(() => ID)
  id!: number;

  name!: string;

  description?: string;

  price!: number;
}
