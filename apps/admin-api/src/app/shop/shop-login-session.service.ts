import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopLoginSessionEntity } from '@urbana/database/shop/shop-login-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopLoginSessionService {
  constructor(
    @InjectRepository(ShopLoginSessionEntity)
    private shopLoginSessionRepository: Repository<ShopLoginSessionEntity>,
  ) {}

  async terminateLoginSession(id: string) {
    return this.shopLoginSessionRepository.delete(id);
  }
}
