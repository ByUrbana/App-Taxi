import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Relation } from '@ptc-org/nestjs-query-graphql';
import { OperatorDTO } from '../../operator/dto/operator.dto';

@ObjectType('Note')
@InputType('NoteInput')
@Relation('staff', () => OperatorDTO)
export class NoteDTO {
  createdAt!: Date;

  note!: string;

  @Field(() => ID)
  staffId!: number;
}
