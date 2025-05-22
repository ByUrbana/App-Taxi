import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSupportRequestActivityEntity } from '@urbana/database/parking/parking-support-request-activity.entity';
import { ParkingSupportRequestEntity } from '@urbana/database/parking/parking-support-request.entity';
import { Repository } from 'typeorm';
import { CreateParkingSupportRequestCommentInput } from './dto/create-parking-support-request-comment.input';
import { ComplaintActivityType } from '@urbana/database/enums/complaint-activity-type.enum';
import { AssignParkingSupportRequestInput } from './dto/assign-parking-support-request.input';
import { OperatorEntity } from '@urbana/database/operator.entity';
import { ChangeParkingSupportRequestStatusInput } from './dto/change-parking-support-request-status.input';

@Injectable()
export class ParkingSupportRequestService {
  constructor(
    @InjectRepository(ParkingSupportRequestEntity)
    private parkingSupportRequestRepository: Repository<ParkingSupportRequestEntity>,
    @InjectRepository(ParkingSupportRequestActivityEntity)
    private parkingSupportRequestActivityRepository: Repository<ParkingSupportRequestActivityEntity>,
  ) {}

  async addCommentToParkingSupportRequest(input: {
    staffId: number;
    input: CreateParkingSupportRequestCommentInput;
  }): Promise<ParkingSupportRequestActivityEntity> {
    const activity = this.parkingSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.comment = input.input.comment;
    activity.supportRequestId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.Comment;
    return this.parkingSupportRequestActivityRepository.save(activity);
  }

  async assignParkingSupportRequestToStaff(input: {
    staffId: number;
    input: AssignParkingSupportRequestInput;
  }): Promise<ParkingSupportRequestActivityEntity> {
    const activity = this.parkingSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.assignedToStaffs = input.input.staffIds.map((id) => ({
      id,
    })) as unknown as OperatorEntity[];
    activity.supportRequestId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.AssignToOperator;
    return this.parkingSupportRequestActivityRepository.save(activity);
  }

  async changeParkingSupportRequestStatus(input: {
    staffId: number;
    input: ChangeParkingSupportRequestStatusInput;
  }): Promise<ParkingSupportRequestActivityEntity> {
    const supportRequest = await this.parkingSupportRequestRepository.findOneBy({
      id: input.input.supportRequestId,
    });
    const activity = this.parkingSupportRequestActivityRepository.create();
    activity.actorId = input.staffId;
    activity.supportRequestId = input.input.supportRequestId;
    activity.type = ComplaintActivityType.StatusChange;
    activity.statusFrom = supportRequest.status;
    activity.statusTo = input.input.status;
    return this.parkingSupportRequestActivityRepository.save(activity);
  }
}
