import { Action } from '@ngrx/store';
import { Page } from '../../models/pagination/page';
import { GroupInvitation } from '../../models/group-invitation';
import { GroupInvitationPayload } from '../../models/store/group-invitation.payload';
import { GetPagePayload } from '../../models/store/get-page.payload';

export enum GroupInvitationsActionTypes {
  CREATE = '[GROUP_INVITES] CREATE',
  CREATE_SUCCESS = '[GROUP_INVITES] CREATE_SUCCESS',
  GET_GROUP_LIST = '[GROUP_INVITES] GET_GROUP_LIST',
  GET_GROUP_LIST_SUCCESS = '[GROUP_INVITES] GET_GROUP_LIST_SUCCESS',
  GET_USER_LIST = '[GROUP_INVITES] GET_USER_LIST',
  GET_USER_LIST_SUCCESS = '[GROUP_INVITES] GET_USER_LIST_SUCCESS',
  CHANGE_STATUS = '[GROUP_INVITES] CHANGE_STATUS',
  FAIL = '[GROUP_INVITES] FAIL',
}

export class InviteToGroup implements Action {
  public type = GroupInvitationsActionTypes.CREATE;

  constructor(public payload: GroupInvitationPayload) {}
}

export class FailedAction implements Action {
  public type = GroupInvitationsActionTypes.FAIL;
}

export class InviteToGroupSuccess implements Action {
  public type = GroupInvitationsActionTypes.CREATE_SUCCESS;

  constructor(public payload: GroupInvitation) {}
}

export class GetGroupInvites implements Action {
  public type = GroupInvitationsActionTypes.GET_GROUP_LIST;

  constructor(public payload: GetPagePayload) {}
}

export class GetGroupInvitesSuccess implements Action {
  public type = GroupInvitationsActionTypes.GET_GROUP_LIST_SUCCESS;

  constructor(public payload: Page<GroupInvitation>) {}
}

export class ChangeGroupInvitationStatus implements Action {
  public type = GroupInvitationsActionTypes.CHANGE_STATUS;

  constructor(public payload: GroupInvitation) {}
}

export class GetUserGroupInvitations implements Action {
  public type = GroupInvitationsActionTypes.GET_USER_LIST;

  constructor(public payload: GetPagePayload) {}
}

export class GetUserGroupInvitationsSuccess implements Action {
  public type = GroupInvitationsActionTypes.GET_USER_LIST_SUCCESS;

  constructor(public payload: Page<GroupInvitation>) {}
}

export type GroupInvitationsActions =
  | InviteToGroup
  | InviteToGroupSuccess
  | GetGroupInvites
  | GetGroupInvitesSuccess
  | ChangeGroupInvitationStatus
  | GetUserGroupInvitations
  | GetUserGroupInvitationsSuccess
  | FailedAction;
