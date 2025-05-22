import { ObjectType } from '@nestjs/graphql';
import { Point } from '@urbana/database';

@ObjectType()
export class PlaceDTO {
  point: Point;
  title?: string;
  address: string;
}
