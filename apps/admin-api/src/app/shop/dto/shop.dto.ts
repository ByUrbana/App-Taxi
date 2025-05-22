import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableUnPagedRelation,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { MediaDTO } from '../../upload/media.dto';
import { Point } from '@urbana/database';
import { ShopItemPresetDTO } from './shop-item-preset.dto';
import { ShopCategoryDTO } from './shop-category.dto';
import { ShopSessionDTO } from './shop-session.dto';
import { ShopWalletDTO } from './shop-wallet.dto';
import { ShopOrderCartDTO } from './shop-order-cart.dto';
import { OrderQueueLevel } from '@urbana/database/shop/enums/order-queue-level.enum';
import { ShopStatus } from '@urbana/database/shop/enums/shop-status.enum';
import { PersonalInfoDTO } from '../../core/fragments/personal-info.dto';
import { WeekdayScheduleDTO } from 'libs/database/src/lib/interfaces/weekday-schedule.dto';
import { RatingAggregateDTO } from '../../core/fragments/rating-aggregate.dto';
import { PhoneNumberDTO } from '../../core/fragments/phone-number.dto';

@ObjectType('Shop')
@Relation('image', () => MediaDTO, { nullable: true })
@FilterableUnPagedRelation('itemPresets', () => ShopItemPresetDTO)
@FilterableUnPagedRelation('categories', () => ShopCategoryDTO)
@UnPagedRelation('sessions', () => ShopSessionDTO)
@UnPagedRelation('wallet', () => ShopWalletDTO)
@OffsetConnection('carts', () => ShopOrderCartDTO, {
  enableAggregate: true,
  enableTotalCount: true,
})
export class ShopDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  name!: string;
  @FilterableField(() => ShopStatus)
  status: ShopStatus;
  @Field(() => PhoneNumberDTO)
  mobileNumber: PhoneNumberDTO;
  @Field(() => PersonalInfoDTO)
  ownerInformation!: PersonalInfoDTO;
  email?: string;
  address: string;
  password?: string;
  createdAt!: Date;
  @Field(() => [WeekdayScheduleDTO])
  weeklySchedule: WeekdayScheduleDTO[];
  orderQueueLevel!: OrderQueueLevel;
  isExpressDeliveryAvailable!: boolean;
  isShopDeliveryAvailable!: boolean;
  @Field(() => Int, {
    description:
      'The percentage of the delivery fee that shop pays so the delivery fee would be more appealing to the users.',
  })
  expressDeliveryShopCommission!: number;
  isOnlinePaymentAvailable!: boolean;
  isCashOnDeliveryAvailable!: boolean;
  lastActivityAt?: Date;
  description?: string;
  location: Point;
  currency!: string;
  @FilterableField(() => RatingAggregateDTO)
  ratingAggregate?: RatingAggregateDTO;
}
