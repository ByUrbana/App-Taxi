import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Login')
export class LoginDTO {
  accessToken: string;
  refreshToken: string;
}
