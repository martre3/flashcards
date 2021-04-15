import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { groupsReducer, GroupsState } from './groups/groups.reducer';

export interface AppState {
  auth: AuthState;
  groups: GroupsState;
}

export const appStates: ActionReducerMap<AppState> = {
  auth: authReducer,
  groups: groupsReducer,
};

export const actions = [];

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectGroupsState = createFeatureSelector<GroupsState>('groups');
