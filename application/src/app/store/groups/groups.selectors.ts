import { createSelector } from '@ngrx/store';
import { selectGroupsState } from '../app.states';

export const selectActiveGroup = createSelector(selectGroupsState, (state) => state.activeGroup);
export const selectGroupList = createSelector(selectGroupsState, (state) => state.groups);
