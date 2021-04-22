import { createSelector } from '@ngrx/store';
import { selectGroupInvitationsState } from '../app.states';

export const selectGroupInvites = createSelector(
  selectGroupInvitationsState,
  (state) => state.groupInvitations
);

export const selectUserGroupInvites = createSelector(
  selectGroupInvitationsState,
  (state) => state.userInvitations
);

export const fromGroupInvitations = {
  selectIsLoading: createSelector(selectGroupInvitationsState, (state) => state.isLoading),
};
