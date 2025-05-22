import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { CustomerDTO } from '../../customer/dto/customer.dto';

@ObjectType('CampaignCode')
@Relation('customer', () => CustomerDTO, { nullable: true })
export class CampaignCodeDTO {
  @IDField(() => ID)
  id: number;
  code: string;
  @FilterableField(() => ID)
  customerId?: number;
  @FilterableField(() => ID)
  campaignId?: number;
}
