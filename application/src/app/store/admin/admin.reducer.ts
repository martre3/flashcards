import { createReducer, on } from '@ngrx/store';
import { restoreState } from '../store-utils';
import { Box } from '../../models/box';
import { AdminActions } from './admin.actions';

export interface AdminState {
  boxes: Box[];
}

const initialStateTemplate: AdminState = {
  boxes: [],
};

const initialState: AdminState = restoreState<AdminState>(
  'admin',
  initialStateTemplate,
  localStorage
);

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.listBoxesSuccess, (state, payload) => ({ ...state, boxes: payload.boxes }))
);
