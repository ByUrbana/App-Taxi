import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { InputType } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { RiderAddressType } from '@urbana/database/enums/rider-address-type.enum';
import { UserContext } from '../../auth/authenticated-user';

@InputType()
@BeforeCreateOne(
  (
    input: CreateOneInputType<CreateRiderAddressInput>,
    context: UserContext,
  ) => {
    return { input: { ...input.input, riderId: context.req.user.id } };
  },
)
export class CreateRiderAddressInput {
  title: string;
  details: string;
  location: Point;
  type?: RiderAddressType;
}
