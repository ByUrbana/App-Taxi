import { ID, ObjectType } from '@nestjs/graphql';
import { IDField, Relation } from '@ptc-org/nestjs-query-graphql';
import { ItemDTO } from './item.dto';

@ObjectType('ItemVariant')
@Relation('item', () => ItemDTO)
export class ItemVariantDTO {
  @IDField(() => ID)
  id!: number;
  name!: string;
  description?: string;
  price!: number;
}
