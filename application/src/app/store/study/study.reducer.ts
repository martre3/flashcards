import { createReducer, on } from '@ngrx/store';
import { restoreState } from '../store-utils';
import { Card } from '../../models/card';
import { StudyActions } from './study.actions';

export interface StudyState {
  card: Card;
}

const initialStateTemplate: StudyState = {
  card: undefined,
};

const initialState: StudyState = restoreState<StudyState>(
  'study',
  initialStateTemplate,
  localStorage
);

export const studyReducer = createReducer(
  initialState,
  on(StudyActions.getCardSuccess, (state, payload) => ({ ...state, card: payload.card }))
);
