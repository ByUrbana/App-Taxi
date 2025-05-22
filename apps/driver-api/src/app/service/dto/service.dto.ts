import {
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { ServicePaymentMethod } from '@urbana/database/enums/service-payment-method.enum';
import { MediaDTO } from '../../upload/media.dto';
import { ServiceOptionDTO } from '../../order/dto/service-option.dto';

@ObjectType('Service')
@Relation('media', () => MediaDTO)
@UnPagedRelation('options', () => ServiceOptionDTO, {
  update: { enabled: true },
})
export class ServiceDTO {
  @IDField(() => ID)
  id: number;
  name: string;
  paymentMethod: ServicePaymentMethod;
  cancellationTotalFee!: number;
}
