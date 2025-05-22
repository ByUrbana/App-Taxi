import { Field, ID, InputType } from '@nestjs/graphql';
import {
  FleetStaffPermissionFinancial,
  FleetStaffPermissionOrder,
} from '@urbana/database/enums/fleet-staff.permissions.enum';

@InputType('CreateFleetStaffInput')
export class CreateFleetStaffInput {
  @Field(() => ID)
  fleetId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  address?: string;
  userName!: string;
  password!: string;
  @Field(() => FleetStaffPermissionOrder)
  permissionOrder!: FleetStaffPermissionOrder;
  @Field(() => FleetStaffPermissionFinancial)
  permissionFinancial!: FleetStaffPermissionFinancial;
  @Field(() => ID, { nullable: true })
  profileImageId?: number;
}
