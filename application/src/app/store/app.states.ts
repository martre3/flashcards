import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { groupsReducer, GroupsState } from './groups/groups.reducer';
import {
  groupInvitationsReducer,
  GroupInvitationsState,
} from './group-invitations/group-invitations.reducer';

export interface AppState {
  auth: AuthState;
  groups: GroupsState;
  groupInvitations: GroupInvitationsState;
}

export const appStates: ActionReducerMap<AppState> = {
  auth: authReducer,
  groups: groupsReducer,
  groupInvitations: groupInvitationsReducer,
};

export const actions = [];

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectGroupsState = createFeatureSelector<GroupsState>('groups');
export const selectGroupInvitationsState = createFeatureSelector<GroupInvitationsState>(
  'groupInvitations'
);
