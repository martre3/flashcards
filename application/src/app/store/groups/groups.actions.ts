import { Action, createAction, props } from '@ngrx/store';
import { PaginationOptions } from '../../models/pagination/pagination-options';
import { Page } from '../../models/pagination/page';
import { Group } from '../../models/group';
import { GetPagePayload } from '../../models/store/get-page.payload';
import { Deck } from '../../models/deck';
import { GetPayload } from '../../models/store/get.payload';

export enum GroupsActionTypes {
  CREATE = '[GROUPS] CREATE',
  CREATE_SUCCESS = '[GROUPS] CREATE_SUCCESS',
  LIST = '[GROUPS] LIST',
  LIST_RECEIVED = '[GROUPS] GROUP_LIST_RECEIVED',
  GET = '[GROUPS] GET',
  GET_SUCCESS = '[GROUPS] GET_SUCCESS',
  LIST_DECKS = '[GROUPS] LIST_DECKS',
  LIST_DECKS_SUCCESS = '[GROUPS] LIST_DECKS_SUCCESS',
}

export const listGroups = createAction(GroupsActionTypes.LIST, props<PaginationOptions>());
export const listReceived = createAction(GroupsActionTypes.LIST_RECEIVED, props<Page<Group>>());
export const GroupsActions = {
  get: createAction(GroupsActionTypes.GET, props<GetPayload>()),
  getSuccess: createAction(GroupsActionTypes.GET_SUCCESS, props<Group>()),
};

export class CreateGroup implements Action {
  public type = GroupsActionTypes.CREATE;

  constructor(public payload: Group) {}
}

export class CreateGroupSuccess implements Action {
  public type = GroupsActionTypes.CREATE_SUCCESS;

  constructor(public payload: Group) {}
}

export const getGroupDeckList = createAction(GroupsActionTypes.LIST_DECKS, props<GetPagePayload>());
export const getGroupDeckListSuccess = createAction(
  GroupsActionTypes.LIST_DECKS_SUCCESS,
  props<Page<Deck>>()
);

export type GroupsActions = CreateGroup | CreateGroupSuccess;
