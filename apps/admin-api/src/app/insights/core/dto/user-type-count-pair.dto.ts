import { Field, ObjectType } from '@nestjs/graphql';
import { AnnouncementUserType } from '@urbana/database/enums/anouncement-user-type.enum';

@ObjectType('UserTypeCountPair')
export class UserTypeCountPairDTO {
  @Field(() => AnnouncementUserType)
  userType: AnnouncementUserType;
  count: number;
}
