import { createReducer, on } from '@ngrx/store';
import { restoreState } from '../store-utils';
import {
  getGroupDeckList,
  getGroupDeckListSuccess,
  GroupsActions,
  listGroups,
  listReceived,
} from './groups.actions';
import { Group } from '../../models/group';
import { Page } from '../../models/pagination/page';
import { User } from '../../models/user';
import { DeckSubscription } from '../../models/deck-subscription';

export interface GroupsState {
  groups: Page<Group>;
  activeGroup: Group;
  decks: Page<DeckSubscription>;
  isLoading: boolean;
  users: Page<User>;
}

const initialStateTemplate: GroupsState = {
  groups: undefined,
  activeGroup: undefined,
  decks: undefined,
  isLoading: false,
  users: undefined,
};

const initialState: GroupsState = restoreState<GroupsState>(
  'groups',
  initialStateTemplate,
  localStorage
);

export const groupsReducer = createReducer(
  initialState,
  on(getGroupDeckList, (state) => ({ ...state })),
  on(getGroupDeckListSuccess, (state, page) => ({ ...state, decks: page })),
  on(GroupsActions.getSuccess, (state, group) => ({ ...state, activeGroup: group })),
  on(GroupsActions.listUsersSuccess, (state, page) => ({ ...state, users: page })),
  on(listGroups, (state) => ({ ...state, isLoading: true })),
  on(listReceived, (state, page) => ({
    ...state,
    groups: { ...page },
    isLoading: false,
  }))
);
