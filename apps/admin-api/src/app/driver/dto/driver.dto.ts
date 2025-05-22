import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { DriverStatus } from '@urbana/database/enums/driver-status.enum';
import { Gender } from '@urbana/database/enums/gender.enum';
import { FeedbackDTO } from '../../feedback/dto/feedback.dto';
import { numberMasker } from '../../number.masker.middleware';
import { OrderDTO } from '../../order/dto/order.dto';
import { MediaDTO } from '../../upload/media.dto';
import { DriverTransactionDTO } from './driver-transaction.dto';
import { DriverWalletDTO } from './driver-wallet.dto';
import { PayoutAccountDTO } from '../../payout/dto/payout-account.dto';
import { DriverSessionDTO } from './driver-session.dto';
import { DeliveryPackageSize } from '@urbana/database/enums/package-size.enum';
import { DriverToDriverDocumentDTO } from '../../driver-document/dto/driver-to-driver-document.dto';
import { DriverServicesServiceDTO } from './driver-services-service.dto';

@ObjectType('Driver')
@OffsetConnection('feedbacks', () => FeedbackDTO, { enableAggregate: true })
@UnPagedRelation('wallet', () => DriverWalletDTO, { relationName: 'wallet' })
@UnPagedRelation('sessions', () => DriverSessionDTO)
@UnPagedRelation('enabledServices', () => DriverServicesServiceDTO)
@UnPagedRelation('driverToDriverDocuments', () => DriverToDriverDocumentDTO)
@OffsetConnection('transactions', () => DriverTransactionDTO)
@OffsetConnection('orders', () => OrderDTO)
@Relation('media', () => MediaDTO, { nullable: true })
@OffsetConnection('payoutAccounts', () => PayoutAccountDTO)
export class DriverDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => ID)
  fleetId?: number;
  firstName?: string;
  @FilterableField(() => String)
  lastName?: string;
  @FilterableField(() => String, { middleware: [numberMasker] })
  mobileNumber: string;
  countryIso?: string;
  certificateNumber?: string;
  canDeliver!: boolean;
  @FilterableField(() => DeliveryPackageSize)
  maxDeliveryPackageSize!: DeliveryPackageSize;
  email?: string;
  @Field(() => Int)
  carProductionYear?: number;
  @FilterableField(() => ID)
  carId?: number;
  @FilterableField(() => ID)
  carColorId?: number;
  carPlate?: string;
  @FilterableField(() => DriverStatus)
  status!: DriverStatus;
  @FilterableField(() => Gender, { nullable: true })
  gender?: Gender;
  @FilterableField()
  rating?: number;
  @FilterableField(() => Int)
  reviewCount: number;
  registrationTimestamp!: Date;
  lastSeenTimestamp?: Date;
  accountNumber?: string;
  bankName?: string;
  bankRoutingNumber?: string;
  bankSwift?: string;
  address?: string;
  softRejectionNote?: string;
  @Field(() => ID)
  mediaId?: number;
}
