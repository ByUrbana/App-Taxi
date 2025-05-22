import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { Point } from 'libs/database/src/lib/interfaces/point';
import { RiderAddressType } from '@urbana/database/enums/rider-address-type.enum';

@ObjectType('Address')
export class AddressDTO {
  @IDField(() => ID)
  id!: number;
  title!: string;
  type!: RiderAddressType;
  details?: string;
  location!: Point;
  @FilterableField(() => ID)
  riderId!: number;
}
