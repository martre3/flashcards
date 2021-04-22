import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

export const selectAdminState = createFeatureSelector<AdminState>('study');

export const fromAdmin = {
  // selectCard: createSelector(selectAdminState, (state) => state.card),
};
