import {
  Authorize,
  FilterableField,
  IDField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { OperatorRoleDTO } from './operator-role.dto';
import { OperatorAuthorizer } from './operator.authorizer';
import { MediaDTO } from '../../upload/media.dto';
import { OperatorSessionDTO } from './operator-session.dto';
import { EnabledNotification } from '@urbana/database/enums/enabled-notification.enum';

@ObjectType('Operator')
@Relation('role', () => OperatorRoleDTO, { nullable: true })
@Relation('media', () => MediaDTO, { nullable: true })
@UnPagedRelation('sessions', () => OperatorSessionDTO)
@Authorize(OperatorAuthorizer)
export class OperatorDTO {
  @IDField(() => ID)
  id!: number;
  @FilterableField()
  firstName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  @FilterableField()
  lastName?: string;
  @FilterableField()
  userName!: string;
  @FilterableField()
  mobileNumber?: string;
  lastActivity?: Date;
  enabledNotifications!: EnabledNotification[];
  @FilterableField()
  isBlocked!: boolean;
  @FilterableField()
  email?: string;
  @FilterableField(() => ID)
  roleId?: number;
}
