import { Field, InputType, Int } from '@nestjs/graphql';
import { AppConfigInfoDTO } from 'libs/database/src/lib/interfaces/app-config-info.dto';

@InputType()
export class UpdateConfigInputV2 {
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  profilePicture?: string;
  adminPanelAPIKey?: string;
  backendMapsAPIKey?: string;
  companyLogo?: string;
  companyName?: string;
  @Field(() => AppConfigInfoDTO, { nullable: true })
  taxi?: AppConfigInfoDTO;
  @Field(() => AppConfigInfoDTO, { nullable: true })
  shop?: AppConfigInfoDTO;
  @Field(() => AppConfigInfoDTO, { nullable: true })
  parking?: AppConfigInfoDTO;
  mysqlHost?: string;
  @Field(() => Int, { nullable: true })
  mysqlPort?: number;
  mysqlUser?: string;
  mysqlPassword?: string;
  mysqlDatabase?: string;
  redisHost?: string;
  @Field(() => Int, { nullable: true })
  redisPort?: number;
  redisPassword?: string;
  @Field(() => Int, { nullable: true })
  redisDb?: number;
  firebaseProjectPrivateKey?: string;
}
