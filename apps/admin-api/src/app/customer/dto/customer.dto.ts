import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Gender } from '@urbana/database/enums/gender.enum';
import { RiderStatus } from '@urbana/database/enums/rider-status.enum';
import { numberMasker } from '../../number.masker.middleware';
import { OrderDTO } from '../../order/dto/order.dto';
import { MediaDTO } from '../../upload/media.dto';
import { RiderAddressDTO } from './rider-address.dto';
import { RiderTransactionDTO } from './rider-transaction.dto';
import { RiderWalletDTO } from './rider-wallet.dto';
import { ParkingWalletDTO } from '../../parking/dto/parking-wallet.dto';

@ObjectType('Rider')
@OffsetConnection('addresses', () => RiderAddressDTO)
@UnPagedRelation('wallet', () => RiderWalletDTO, { relationName: 'wallets' })
@UnPagedRelation('parkingWallets', () => ParkingWalletDTO)
@OffsetConnection('transactions', () => RiderTransactionDTO)
@OffsetConnection('orders', () => OrderDTO, { enableAggregate: true })
@Relation('media', () => MediaDTO, { nullable: true })
export class CustomerDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => RiderStatus)
  status: RiderStatus;
  @FilterableField()
  firstName?: string;
  @FilterableField()
  lastName?: string;
  @Field(() => String, {
    nullable: true,
    description:
      'Country ISO code. For example "GB" for United Kingdom, "CA" for Canada, "AU" for Australia, etc.',
  })
  countryIso?: string;
  lastActivityAt?: Date;
  @FilterableField(() => String, { middleware: [numberMasker] })
  mobileNumber: string;
  registrationTimestamp: Date;
  email?: string;
  @FilterableField(() => Gender, { nullable: true })
  gender?: Gender;
  isResident?: boolean;
  idNumber?: string;
}
