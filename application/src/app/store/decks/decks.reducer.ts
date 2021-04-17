import { createReducer, on } from '@ngrx/store';
import { restoreState } from '../store-utils';
import { Page } from '../../models/pagination/page';
import { Deck } from '../../models/deck';
import { DecksActions } from './decks.actions';
import { IdMap } from '../../models/other/id-map';

export interface DecksState {
  decks: Page<Deck>;
  isAssignToGroupOpen: boolean;
  selection: IdMap<Deck>;
}

const initialStateTemplate: DecksState = {
  decks: undefined,
  isAssignToGroupOpen: false,
  selection: {},
};

const initialState: DecksState = restoreState<DecksState>(
  'groups',
  initialStateTemplate,
  localStorage
);

export const decksReducer = createReducer(
  initialState,
  on(DecksActions.listSuccess, (state, page) => ({ ...state, decks: page })),
  on(DecksActions.toggleAssignToGroup, (state, payload) => ({
    ...state,
    isAssignToGroupOpen: payload.open,
  })),
  on(DecksActions.select, (state, deck) => ({
    ...state,
    selection: { ...state.selection, [deck._id]: deck },
  })),
  on(DecksActions.deselect, (state, deck) => ({
    ...state,
    selection: { ...state.selection, [deck._id]: null },
  })),
  on(DecksActions.setSelection, (state, action) => ({
    ...state,
    selection: { ...action.ids },
  }))
);
