import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@urbana/database/customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CustomerSessionEntity } from '@urbana/database/customer-session.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(CustomerSessionEntity)
    private readonly customerSessionRepository: Repository<CustomerSessionEntity>,
  ) {}

  async terminateLoginSession(sessionId: string): Promise<DeleteResult> {
    return this.customerSessionRepository.softDelete(sessionId);
  }
}
