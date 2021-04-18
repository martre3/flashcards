import { createAction, props } from '@ngrx/store';
import { PaginationOptions } from '../../models/pagination/pagination-options';
import { Page } from '../../models/pagination/page';
import { Deck } from '../../models/deck';
import { GetPayload } from '../../models/store/get.payload';
import { ToggleAssignToGroupPayload } from '../../models/store/toggle-assign-to-group.payload';
import { IdMap } from '../../models/other/id-map';

export enum DecksActionTypes {
  CREATE = '[DECKS] CREATE',
  CREATE_SUCCESS = '[DECKS] CREATE_SUCCESS',
  LIST = '[DECKS] LIST',
  LIST_SUCCESS = '[DECKS] GROUP_LIST_SUCCESS',
  GET = '[DECKS] GET',
  GET_SUCCESS = '[DECKS] GET_SUCCESS',
  TOGGLE_ASSIGN_TO_GROUP = '[DECKS] TOGGLE_ASSIGN_TO_GROUP',
  SELECT = '[DECKS] SELECT',
  DESELECT = '[DECKS] DESELECT',
  SET_SELECTION = '[DECKS] SET_SELECTION',
  SUBSCRIBE = '[DECKS] SUBSCRIBE',
  UNSUBSCRIBE = '[DECKS] UNSUBSCRIBE',
  GET_SUBSCRIPTIONS = '[DECKS] GET_SUBSCRIPTIONS',
  GET_SUBSCRIPTIONS_SUCCESS = '[DECKS] GET_SUBSCRIPTIONS_SUCCESS',
}

export const DecksActions = {
  get: createAction(DecksActionTypes.GET, props<GetPayload>()),
  getSuccess: createAction(DecksActionTypes.GET_SUCCESS, props<Deck>()),
  list: createAction(DecksActionTypes.LIST, props<PaginationOptions>()),
  listSuccess: createAction(DecksActionTypes.LIST_SUCCESS, props<Page<Deck>>()),
  create: createAction(DecksActionTypes.CREATE, props<Deck>()),
  createSuccess: createAction(DecksActionTypes.CREATE_SUCCESS, props<Deck>()),
  toggleAssignToGroup: createAction(
    DecksActionTypes.TOGGLE_ASSIGN_TO_GROUP,
    props<ToggleAssignToGroupPayload>()
  ),
  select: createAction(DecksActionTypes.SELECT, props<Deck>()),
  deselect: createAction(DecksActionTypes.DESELECT, props<Deck>()),
  setSelection: createAction(DecksActionTypes.SET_SELECTION, props<{ ids: IdMap<Deck> }>()),
  subscribe: createAction(DecksActionTypes.SUBSCRIBE, props<Deck>()),
  unsubscribe: createAction(DecksActionTypes.UNSUBSCRIBE, props<Deck>()),
  getSubscriptions: createAction(DecksActionTypes.GET_SUBSCRIPTIONS),
  getSubscriptionsSuccess: createAction(
    DecksActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
    props<IdMap<string>>()
  ),
};
