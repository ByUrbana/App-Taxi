import { InputType } from '@nestjs/graphql';
import { AppType } from '@urbana/database/enums/app-type.enum';
import { OperatorPermission } from '@urbana/database/enums/operator-permission.enum';
import { ParkingPermission } from '@urbana/database/enums/parking-permission.enum';
import { ShopPermission } from '@urbana/database/enums/shop-permission.enum';
import { TaxiPermission } from '@urbana/database/enums/taxi-permissions.enum';

@InputType()
export class OperatorRoleInput {
  title!: string;
  permissions: OperatorPermission[];
  taxiPermissions: TaxiPermission[];
  shopPermissions: ShopPermission[];
  parkingPermissions: ParkingPermission[];
  allowedApps: AppType[];
}
