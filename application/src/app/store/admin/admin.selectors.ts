import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const fromAdmin = {
  selectBoxes: createSelector(selectAdminState, (state) => state.boxes),
};
