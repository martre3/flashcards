import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudyState } from './study.reducer';

export const selectStudyState = createFeatureSelector<StudyState>('study');

export const fromStudy = {
  selectCard: createSelector(selectStudyState, (state) => state.card),
};
