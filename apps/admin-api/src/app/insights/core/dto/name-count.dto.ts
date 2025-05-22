import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('NameCount')
export class NameCountDTO {
  name: string;
  @Field(() => Int)
  count: number;
}
