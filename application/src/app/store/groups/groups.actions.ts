import { Action } from '@ngrx/store';
import { PaginationOptions } from '../../models/pagination/pagination-options';
import { Page } from '../../models/pagination/page';
import { Group } from '../../models/group';

export enum GroupsActionTypes {
  CREATE = '[GROUPS] CREATE',
  CREATE_SUCCESS = '[GROUPS] CREATE_SUCCESS',
  LIST = '[GROUPS] LIST',
  LIST_RECEIVED = '[GROUPS] GROUP_LIST_RECEIVED',
  GET = '[GROUPS] GET',
  GET_RECEIVED = '[GROUPS] GET_RECEIVED',
}

export class ListGroups implements Action {
  public type = GroupsActionTypes.LIST;

  constructor(public payload: PaginationOptions) {}
}

export class GroupListReceived implements Action {
  public type = GroupsActionTypes.LIST_RECEIVED;

  constructor(public payload: Page<Group>) {}
}

export class GetGroup implements Action {
  public type = GroupsActionTypes.GET;

  constructor(public payload: string) {}
}

export class GroupReceived implements Action {
  public type = GroupsActionTypes.GET_RECEIVED;

  constructor(public payload: Group) {}
}

export class CreateGroup implements Action {
  public type = GroupsActionTypes.CREATE;

  constructor(public payload: Group) {}
}

export class CreateGroupSuccess implements Action {
  public type = GroupsActionTypes.CREATE_SUCCESS;

  constructor(public payload: Group) {}
}

export type GroupsActions =
  | ListGroups
  | GroupListReceived
  | GetGroup
  | GroupReceived
  | CreateGroup
  | CreateGroupSuccess;
