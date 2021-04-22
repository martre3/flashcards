import { restoreState } from '../store-utils';
import { Page } from '../../models/pagination/page';
import { GroupInvitation } from '../../models/group-invitation';
import {
  GetGroupInvitesSuccess,
  GetUserGroupInvitationsSuccess,
  GroupInvitationsActions,
  GroupInvitationsActionTypes,
  InviteToGroupSuccess,
} from './group-invitations.actions';

export interface GroupInvitationsState {
  groupInvitations: Page<GroupInvitation>;
  userInvitations: Page<GroupInvitation>;
  isLoading: boolean;
}

const initialStateTemplate: GroupInvitationsState = {
  groupInvitations: undefined,
  userInvitations: undefined,
  isLoading: true,
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
    case GroupInvitationsActionTypes.GET_USER_LIST:
    case GroupInvitationsActionTypes.GET_GROUP_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case GroupInvitationsActionTypes.GET_GROUP_LIST_SUCCESS:
      return {
        ...state,
        groupInvitations: { ...(action as GetGroupInvitesSuccess).payload },
        isLoading: false,
      };
    case GroupInvitationsActionTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        userInvitations: { ...(action as GetUserGroupInvitationsSuccess).payload },
        isLoading: false,
      };
    case GroupInvitationsActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        groupInvitations: {
          ...state.groupInvitations,
          data: [(action as InviteToGroupSuccess).payload, ...state.groupInvitations.data],
        },
      };
    default:
      return {
        ...state,
      };
  }
};
