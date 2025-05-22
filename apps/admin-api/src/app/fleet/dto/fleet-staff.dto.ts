import { ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { FleetStaffPermissionOrder } from '@urbana/database/enums/fleet-staff.permissions.enum';
import { MediaDTO } from '../../upload/media.dto';

@ObjectType('FleetStaff')
@Relation('profileImage', () => MediaDTO, { nullable: true })
export class FleetStaffDTO {
  @IDField(() => ID)
  id: number;
  registeredAt: Date;
  @FilterableField()
  firstName: string;
  @FilterableField()
  lastName: string;
  phoneNumber: string;
  mobileNumber: string;
  email?: string;
  lastActivityAt?: Date;
  @FilterableField()
  isBlocked: boolean;
  address?: string;
  @FilterableField()
  userName!: string;
  password!: string;
  permissionOrder!: FleetStaffPermissionOrder;
  permissionFinancial!: FleetStaffPermissionOrder;
  @FilterableField(() => ID)
  fleetId!: number;
}
