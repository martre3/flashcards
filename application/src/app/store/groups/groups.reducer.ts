import { createReducer, on } from '@ngrx/store';
import { restoreState } from '../store-utils';
import {
  getGroupDeckList,
  getGroupDeckListSuccess,
  GroupsActions,
  listReceived,
} from './groups.actions';
import { Group } from '../../models/group';
import { Page } from '../../models/pagination/page';
import { Deck } from '../../models/deck';
import { User } from '../../models/user';

export interface GroupsState {
  groups: Page<Group>;
  activeGroup: Group;
  decks: Page<Deck>;
  users: Page<User>;
}

const initialStateTemplate: GroupsState = {
  groups: undefined,
  activeGroup: undefined,
  decks: undefined,
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
  on(listReceived, (state, page) => ({
    ...state,
    groups: { ...page },
  }))
);
