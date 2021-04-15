import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const appStates: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const actions = [];

export const selectAuthState = createFeatureSelector<AuthState>('auth');
