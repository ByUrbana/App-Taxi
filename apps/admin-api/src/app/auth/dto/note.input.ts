import { InputType } from '@nestjs/graphql';

@InputType('NoteInput')
export class NoteInput {
  note!: string;
}
