import { restoreState } from '../store-utils';
import { Page } from '../../models/pagination/page';
import { GroupInvitation } from '../../models/group-invitation';
import {
  GetGroupInvitesSuccess,
  GetUserGroupInvitationsSuccess,
  GroupInvitationsActions,
  GroupInvitationsActionTypes,
} from './group-invitations.actions';

export interface GroupInvitationsState {
  groupInvitations: Page<GroupInvitation>;
  userInvitations: Page<GroupInvitation>;
}

const initialStateTemplate: GroupInvitationsState = {
  groupInvitations: undefined,
  userInvitations: undefined,
};

const initialState: GroupInvitationsState = restoreState<GroupInvitationsState>(
  'groupInvitations',
  initialStateTemplate,
  localStorage
);

export const groupInvitationsReducer = (
  state: GroupInvitationsState = initialState,
  action: GroupInvitationsActions
): GroupInvitationsState => {
  switch (action.type) {
    case GroupInvitationsActionTypes.GET_GROUP_LIST_SUCCESS:
      return {
        ...state,
        groupInvitations: { ...(action as GetGroupInvitesSuccess).payload },
      };
    case GroupInvitationsActionTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        userInvitations: { ...(action as GetUserGroupInvitationsSuccess).payload },
      };
    default:
      return {
        ...state,
      };
  }
};
