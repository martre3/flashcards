import { createReducer } from '@ngrx/store';
import { restoreState } from '../store-utils';
import { Card } from '../../models/card';

export interface AdminState {
  card: Card;
}

const initialStateTemplate: AdminState = {
  card: undefined,
};

const initialState: AdminState = restoreState<AdminState>(
  'admin',
  initialStateTemplate,
  localStorage
);

export const adminReducer = createReducer(
  initialState
  // on(AdminActions.getCardSuccess, (state, payload) => ({ ...state, card: payload.card }))
);
