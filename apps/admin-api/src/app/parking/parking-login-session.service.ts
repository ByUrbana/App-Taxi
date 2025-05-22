import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLoginSessionEntity } from '@urbana/database/parking/parking-login-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingLoginSessionService {
  constructor(
    @InjectRepository(ParkingLoginSessionEntity)
    private parkingLoginSessionRepository: Repository<ParkingLoginSessionEntity>,
  ) {}

  async terminateParkingLoginSession(id: string) {
    return this.parkingLoginSessionRepository.delete(id);
  }
}
