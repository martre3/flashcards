import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DecksState } from './decks.reducer';

export const selectDecksState = createFeatureSelector<DecksState>('decks');

export const fromDecks = {
  selectDecksList: createSelector(selectDecksState, (state) => state.decks),
  selectSelectedDecks: createSelector(selectDecksState, (state) => state.selection),
  selectIsAssignToGroupOpened: createSelector(
    selectDecksState,
    (state) => state.isAssignToGroupOpen
  ),
};
