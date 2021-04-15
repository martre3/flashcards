import { restoreState } from '../store-utils';
import {
  GroupListReceived,
  GroupReceived,
  GroupsActions,
  GroupsActionTypes,
} from './groups.actions';
import { Group } from '../../models/group';
import { Page } from '../../models/pagination/page';

export interface GroupsState {
  groups: Page<Group>;
  activeGroup: Group;
}

const initialStateTemplate: GroupsState = {
  groups: undefined,
  activeGroup: undefined,
};

const initialState: GroupsState = restoreState<GroupsState>(
  'groups',
  initialStateTemplate,
  localStorage
);

export const groupsReducer = (
  state: GroupsState = initialState,
  action: GroupsActions
): GroupsState => {
  switch (action.type) {
    case GroupsActionTypes.LIST_RECEIVED:
      return {
        ...state,
        groups: { ...(action as GroupListReceived).payload },
      };
    case GroupsActionTypes.GET_RECEIVED:
      return {
        ...state,
        activeGroup: { ...(action as GroupReceived).payload },
      };
    default:
      return {
        ...state,
      };
  }
};
