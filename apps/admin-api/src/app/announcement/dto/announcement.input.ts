import { InputType } from '@nestjs/graphql';
import { AnnouncementUserType } from '@urbana/database/enums/anouncement-user-type.enum';
import { AppType } from '@urbana/database/enums/app-type.enum';

@InputType()
export class AnnouncementInput {
  title: string;
  description?: string;
  url?: string;
  appType?: AppType;
  userType?: AnnouncementUserType[];
  startAt?: Date;
  expireAt?: Date;
}
