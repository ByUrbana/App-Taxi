import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxiOrderEntity } from '@urbana/database/taxi/taxi-order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxiOrderInsightsService {
  constructor(
    @InjectRepository(TaxiOrderEntity)
    private taxiOrderRepository: Repository<TaxiOrderEntity>,
  ) {}
}
