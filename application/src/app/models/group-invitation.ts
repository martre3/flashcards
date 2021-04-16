import { User } from './user';
import { GroupInvitationStatus } from './types/group-invitation-status';
import { Group } from './group';

export interface GroupInvitation {
  _id: string;
  status: GroupInvitationStatus;
  group?: Group;
  groupId: string;
  invitee?: User;
  inviteeId: string;
  owner?: User;
  ownerId: string;
}
