import { Field, ID, InputType } from '@nestjs/graphql';
import {
  FleetStaffPermissionFinancial,
  FleetStaffPermissionOrder,
} from '@urbana/database/enums/fleet-staff.permissions.enum';

@InputType()
export class UpdateFleetStaffInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  address?: string;
  email?: string;
  userName?: string;
  password?: string;
  @Field(() => FleetStaffPermissionOrder)
  permissionOrder?: FleetStaffPermissionOrder;
  @Field(() => FleetStaffPermissionFinancial)
  permissionFinancial?: FleetStaffPermissionFinancial;
  @Field(() => ID, { nullable: true })
  profileImageId?: number;
  isBlocked?: boolean;
}
