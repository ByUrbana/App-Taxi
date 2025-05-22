import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CountryDistribution')
export class CountryDistributionDTO {
  country: string;
  @Field(() => Int)
  count: number;
}
