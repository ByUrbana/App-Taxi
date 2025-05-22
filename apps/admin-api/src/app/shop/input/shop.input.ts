import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { PersonalInfoDTO } from '../../core/fragments/personal-info.dto';
import { ShopStatus } from '@urbana/database/shop/enums/shop-status.enum';
import { Point } from '@urbana/database';
import { WeekdayScheduleDTO } from 'libs/database/src/lib/interfaces/weekday-schedule.dto';

@InputType()
export class UpsertShopInput {
  name?: string;
  @Field(() => ShopStatus)
  status?: ShopStatus;
  mobileNumber?: string;
  @Field(() => PersonalInfoDTO)
  personalInfo?: PersonalInfoDTO;
  email?: string;
  address?: string;
  password?: string;
  @Field(() => [WeekdayScheduleDTO])
  weeklySchedule?: WeekdayScheduleDTO[];
  isExpressDeliveryAvailable?: boolean;
  isShopDeliveryAvailable?: boolean;
  @Field(() => Int, {
    description:
      'The percentage of the delivery fee that shop pays so the delivery fee would be more appealing to the users.',
  })
  expressDeliveryShopCommission?: number;
  isOnlinePaymentAvailable?: boolean;
  isCashOnDeliveryAvailable?: boolean;
  description?: string;
  @Field(() => Point)
  location?: Point;
  @Field(() => ID, { nullable: true })
  imageId?: number;
}
