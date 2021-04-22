import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { groupsReducer, GroupsState } from './groups/groups.reducer';
import {
  groupInvitationsReducer,
  GroupInvitationsState,
} from './group-invitations/group-invitations.reducer';
import { routerReducer, RouterState } from './router/router.reducer';
import { decksReducer, DecksState } from './decks/decks.reducer';
import { studyReducer, StudyState } from './study/study.reducer';
import { adminReducer, AdminState } from './admin/admin.reducer';

export interface AppState {
  admin: AdminState;
  auth: AuthState;
  groups: GroupsState;
  groupInvitations: GroupInvitationsState;
  router: RouterState;
  decks: DecksState;
  study: StudyState;
}

export const appStates: ActionReducerMap<AppState> = {
  admin: adminReducer,
  auth: authReducer,
  groups: groupsReducer,
  groupInvitations: groupInvitationsReducer,
  router: routerReducer,
  decks: decksReducer,
  study: studyReducer,
};

export const actions = [];

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectGroupsState = createFeatureSelector<GroupsState>('groups');
export const selectGroupInvitationsState = createFeatureSelector<GroupInvitationsState>(
  'groupInvitations'
);
