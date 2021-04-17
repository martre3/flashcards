import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { groupsReducer, GroupsState } from './groups/groups.reducer';
import {
  groupInvitationsReducer,
  GroupInvitationsState,
} from './group-invitations/group-invitations.reducer';
import { routerReducer, RouterState } from './router/router.reducer';
import { decksReducer, DecksState } from './decks/decks.reducer';

export interface AppState {
  auth: AuthState;
  groups: GroupsState;
  groupInvitations: GroupInvitationsState;
  router: RouterState;
  decks: DecksState;
}

export const appStates: ActionReducerMap<AppState> = {
  auth: authReducer,
  groups: groupsReducer,
  groupInvitations: groupInvitationsReducer,
  router: routerReducer,
  decks: decksReducer,
};

export const actions = [];

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectGroupsState = createFeatureSelector<GroupsState>('groups');
export const selectGroupInvitationsState = createFeatureSelector<GroupInvitationsState>(
  'groupInvitations'
);
