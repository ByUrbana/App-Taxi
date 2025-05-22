import { Field, ID, InputType } from '@nestjs/graphql';
import { EnabledNotification } from '@urbana/database/enums/enabled-notification.enum';

@InputType()
export class UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  userName?: string;
  @Field(() => ID, { nullable: true })
  mediaId?: number;
  @Field(() => [EnabledNotification], { nullable: true })
  enabledNotifications?: EnabledNotification[];
}
