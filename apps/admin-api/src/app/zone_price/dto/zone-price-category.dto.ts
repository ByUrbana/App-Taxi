import { IDField, OffsetConnection } from '@ptc-org/nestjs-query-graphql';
import { ZonePriceDTO } from './zone-price.dto';
import { ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ZonePriceCategory')
@OffsetConnection('zonePrices', () => ZonePriceDTO, {})
export class ZonePriceCategoryDTO {
  @IDField(() => ID)
  id: number;
  name!: string;
}
