import { createSelector } from '@ngrx/store';
import { selectAuthState } from '../app.states';

export const selectCurrentUser = createSelector(selectAuthState, (state) => state.user);
export const selectAuthenticationToken = createSelector(selectAuthState, (state) => state.jwt);
