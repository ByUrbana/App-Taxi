import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { AnnouncementUserType } from '@urbana/database/enums/anouncement-user-type.enum';
import { AnnouncementAuthorizer } from './announcement.authorizer';
import { AppType } from '@urbana/database/enums/app-type.enum';

@ObjectType('Announcement')
@Authorize(AnnouncementAuthorizer)
export class AnnouncementDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  title: string;
  @FilterableField()
  description: string;
  url?: string;
  userType: AnnouncementUserType[];
  @FilterableField(() => AppType, { nullable: true })
  appType?: AppType;
  startAt: Date;
  expireAt: Date;
}
