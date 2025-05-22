import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ProviderBrand } from '@urbana/database/enums/card-type.enum';
import { SavedPaymentMethodType } from '@urbana/database/enums/saved-payment-method-type';

@ObjectType('SavedPaymentMethod')
export class SavedPaymentMethodDTO {
  @IDField(() => ID)
  id!: number;
  title!: string;
  lastFour?: string;
  isDefault!: boolean;
  @Field(() => SavedPaymentMethodType)
  type: SavedPaymentMethodType;
  @FilterableField(() => Boolean, { filterOnly: true })
  isEnabled!: boolean;
  @Field(() => ProviderBrand, { nullable: true })
  providerBrand?: ProviderBrand;
  expiryDate?: Date;
  holderName?: string;
  @FilterableField(() => ID, { nullable: true, filterOnly: true })
  riderId?: number;
  @FilterableField(() => ID, { nullable: true, filterOnly: true })
  driverId?: number;
}
