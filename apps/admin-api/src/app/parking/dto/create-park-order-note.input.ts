import { Field, ID, InputType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { UserContext } from '../../auth/authenticated-admin';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<CreateParkOrderNoteInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, staffId: context.req.user.id } };
  },
)
export class CreateParkOrderNoteInput {
  @Field(() => ID)
  parkOrderId: number;
  note: string;
}
