import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponEntity } from '@urbana/database/coupon.entity';
import { RiderRechargeTransactionType } from '@urbana/database/enums/rider-recharge-transaction-type.enum';
import { TransactionAction } from '@urbana/database/enums/transaction-action.enum';
import { TransactionStatus } from '@urbana/database/enums/transaction-status.enum';
import { SharedRiderService } from '@urbana/order/shared-rider.service';
import { ForbiddenError } from '@nestjs/apollo';
import { Repository } from 'typeorm';
import { RiderWalletDTO } from '../wallet/dto/rider-wallet.dto';

@Injectable()
export class CouponService {
  constructor(private sharedRiderService: SharedRiderService) {}
}
