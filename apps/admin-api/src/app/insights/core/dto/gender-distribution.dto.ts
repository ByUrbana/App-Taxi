import { ObjectType } from '@nestjs/graphql';
import { Gender } from '@urbana/database/enums/gender.enum';

@ObjectType('GenderDistribution')
export class GenderDistributionDTO {
  gender: Gender;
  count: number;
}
