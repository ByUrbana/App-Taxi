import { Authorize } from '@ptc-org/nestjs-query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { OperatorAuthorizer } from '../dto/operator.authorizer';

@InputType()
@Authorize(OperatorAuthorizer)
export class CreateOperatorInput {
  firstName?: string;
  lastName?: string;
  userName!: string;
  password!: string;
  mobileNumber!: string;
  email?: string;
  @Field(() => ID)
  roleId!: number;
}
