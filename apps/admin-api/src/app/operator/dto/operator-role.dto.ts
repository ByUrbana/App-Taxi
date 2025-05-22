import {
  Authorize,
  FilterableField,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { OperatorPermission } from '@urbana/database/enums/operator-permission.enum';
import { OperatorAuthorizer } from './operator.authorizer';
import { AppType } from '@urbana/database/enums/app-type.enum';
import { ShopPermission } from '@urbana/database/enums/shop-permission.enum';
import { ParkingPermission } from '@urbana/database/enums/parking-permission.enum';
import { TaxiPermission } from '@urbana/database/enums/taxi-permissions.enum';

@ObjectType('OperatorRole')
@Authorize(OperatorAuthorizer)
export class OperatorRoleDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  title!: string;
  permissions: OperatorPermission[];
  taxiPermissions: TaxiPermission[];
  shopPermissions: ShopPermission[];
  parkingPermissions: ParkingPermission[];
  allowedApps: AppType[];
}
