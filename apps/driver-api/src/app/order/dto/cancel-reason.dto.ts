import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { AnnouncementUserType } from '@urbana/database/enums/anouncement-user-type.enum';

@Authorize({
  authorize: (context) => ({
    userType: { eq: AnnouncementUserType.Driver },
    isEnabled: true,
  }),
})
@ObjectType('OrderCancelReason')
export class OrderCancelReasonDTO {
  @IDField(() => ID)
  id!: number;
  @Field()
  title!: string;
  @FilterableField({ filterOnly: true })
  isEnabled!: boolean;
  @FilterableField(() => AnnouncementUserType, { filterOnly: true })
  userType!: AnnouncementUserType;
}
