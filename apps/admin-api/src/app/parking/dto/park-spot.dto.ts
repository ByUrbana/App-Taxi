import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  OffsetConnection,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { Point } from '@urbana/database';
import { ParkSpotCarSize } from '@urbana/database/parking/enums/park-spot-car-size.enum';
import { ParkSpotFacility } from '@urbana/database/parking/enums/park-spot-facility.enum';
import { ParkSpotType } from '@urbana/database/parking/enums/park-spot-type.enum';
import { MediaDTO } from '../../upload/media.dto';
import { ParkOrderDTO } from './park-order.dto';
import { ParkingFeedbackDTO } from '../modules/feedback/dto/parking-feedback.dto';
import { CustomerDTO } from '../../customer/dto/customer.dto';
import { ParkSpotStatus } from '@urbana/database/parking/enums/park-spot-status.enum';
import { WeekdayScheduleDTO } from 'libs/database/src/lib/interfaces/weekday-schedule.dto';
import { RatingAggregateDTO } from '../../core/fragments/rating-aggregate.dto';

@ObjectType('ParkSpot')
@UnPagedRelation('images', () => MediaDTO)
@Relation('mainImage', () => MediaDTO, { nullable: true })
@Relation('owner', () => CustomerDTO, { nullable: true })
@OffsetConnection('feedbacks', () => ParkingFeedbackDTO)
@OffsetConnection('parkOrders', () => ParkOrderDTO, { enableTotalCount: true })
export class ParkSpotDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField(() => ParkSpotStatus)
  status: ParkSpotStatus;
  @FilterableField(() => ParkSpotType)
  type: ParkSpotType;
  @FilterableField(() => String)
  name?: string;
  @Field(() => Point)
  location!: Point;
  @FilterableField(() => String, { nullable: true })
  address?: string;
  phoneNumber?: string;
  email?: string;
  @FilterableField(() => RatingAggregateDTO)
  ratingAggregate!: RatingAggregateDTO;
  openHour?: string;
  createdAt!: Date;
  @Field(() => [WeekdayScheduleDTO])
  weeklySchedule: WeekdayScheduleDTO[];
  lastActivityAt?: Date;
  closeHour?: string;
  acceptNewRequest!: boolean;
  acceptExtendRequest!: boolean;
  @FilterableField(() => ParkSpotCarSize, { nullable: true })
  carSize?: ParkSpotCarSize;
  carPrice?: number;
  @Field(() => Int)
  carSpaces: number;
  bikePrice?: number;
  @Field(() => Int)
  bikeSpaces: number;
  truckPrice?: number;
  @Field(() => Int)
  truckSpaces: number;
  currency!: string;
  description?: string;
  operatorName?: string;
  operatorPhoneCountryCode?: string;
  operatorPhoneNumber?: string;
  @Field(() => [ParkSpotFacility])
  facilities!: ParkSpotFacility[];
  @Field(() => ID)
  mainImageId?: number;
  // a virtual field for current status of the park spot
  // @Field(() => ParkSpotStatus, {
  //   middleware: [
  //     async (ctx: MiddlewareContext) => {
  //       const source = ctx.source;
  //       const openHour = source.openHour;
  //       const closeHour = source.closeHour;
  //       const now = new Date();
  //       // if the park spot is closed
  //       if (openHour && closeHour) {
  //         const openHourParts = openHour.split(':');
  //         const closeHourParts = closeHour.split(':');
  //         const openTime = new Date();
  //         openTime.setHours(parseInt(openHourParts[0]));
  //         openTime.setMinutes(parseInt(openHourParts[1]));
  //         const closeTime = new Date();
  //         closeTime.setHours(parseInt(closeHourParts[0]));
  //         closeTime.setMinutes(parseInt(closeHourParts[1]));
  //         if (now < openTime || now > closeTime) {
  //           return ParkSpotStatus.Closed;
  //         }
  //       }
  //       if (
  //         source.acceptNewRequest &&
  //         source.acceptExtendRequest &&
  //         (source.carSpaces > 0 ||
  //           source.bikeSpaces > 0 ||
  //           source.truckSpaces > 0)
  //       ) {
  //         return ParkSpotStatus.Available;
  //       }
  //       return ParkSpotStatus.Occupied;
  //     },
  //   ],
  // })
  // status: ParkSpotStatus;
}
