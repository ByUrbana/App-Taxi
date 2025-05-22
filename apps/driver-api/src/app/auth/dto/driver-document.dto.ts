import { ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('DriverDocument')
export class DriverDocumentDTO {
  @IDField(() => ID)
  id!: number;
  title!: string;
  description?: string;
  isEnabled!: boolean;
  isRequired!: boolean;
}
