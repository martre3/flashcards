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

export interface GroupsState {
  groups: Page<Group>;
  activeGroup: Group;
  decks: Page<Deck>;
}

const initialStateTemplate: GroupsState = {
  groups: undefined,
  activeGroup: undefined,
  decks: undefined,
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
  on(listReceived, (state, page) => ({
    ...state,
    groups: { ...page },
  }))
);
//
// export const groupsReducer = (
//   state: GroupsState = initialState,
//   action: GroupsActions
// ): GroupsState => {
//   switch (action.type) {
//     case GroupsActionTypes.LIST_RECEIVED:
//       return {
//         ...state,
//         groups: { ...(action as GroupListReceived).payload },
//       };
//     case GroupsActionTypes.GET_RECEIVED:
//       return {
//         ...state,
//         activeGroup: { ...(action as GroupReceived).payload },
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };
