import { Field, ID, InputType } from '@nestjs/graphql';
import { ParkSpotCarSize } from '@urbana/database/parking/enums/park-spot-car-size.enum';
import { ParkSpotVehicleType } from '@urbana/database/parking/enums/park-spot-vehicle-type.enum';
import { PaymentMode } from '@urbana/database/enums/payment-mode.enum';

@InputType()
export class CreateParkOrderInput {
  vehicleType!: ParkSpotVehicleType;
  enterTime!: Date;
  exitTime!: Date;
  @Field(() => ID)
  parkSpotId!: number;
  carSize?: ParkSpotCarSize;
  paymentMode!: PaymentMode;
  @Field(() => ID)
  paymentMethodId?: number;
}
