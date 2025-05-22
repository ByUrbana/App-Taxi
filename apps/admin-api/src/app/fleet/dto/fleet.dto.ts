import {
  Authorize,
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { Point } from '@urbana/database';
import { ZonePriceDTO } from '../../zone_price/dto/zone-price.dto';
import { FleetTransactionDTO } from './fleet-transaction.dto';
import { FleetWalletDTO } from './fleet-wallet.dto';
import { FleetAuthorizer } from './fleet.authorizer';
import { DriverDTO } from '../../driver/dto/driver.dto';
import { MediaDTO } from '../../upload/media.dto';

@ObjectType('Fleet')
@UnPagedRelation('wallet', () => FleetWalletDTO, { relationName: 'wallet' })
@OffsetConnection('transactions', () => FleetTransactionDTO)
@OffsetConnection('zonePrices', () => ZonePriceDTO)
@Relation('profilePicture', () => MediaDTO, { nullable: true })
@OffsetConnection('drivers', () => DriverDTO, { enableAggregate: true })
@Authorize(FleetAuthorizer)
export class FleetDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  name!: string;
  createdAt?: Date;
  isBlocked!: boolean;
  phoneNumber: string;
  mobileNumber: string;
  userName?: string;
  password?: string;
  accountNumber: string;
  commissionSharePercent!: number;
  commissionShareFlat!: number;
  feeMultiplier?: number;
  address?: string;
  exclusivityAreas?: Point[][];
}
