import { createReducer, on } from '@ngrx/store';
import _ from 'underscore';
import { restoreState } from '../store-utils';
import { Page } from '../../models/pagination/page';
import { Deck } from '../../models/deck';
import { DecksActions } from './decks.actions';
import { IdMap } from '../../models/other/id-map';

export interface DecksState {
  deck: Deck;
  decks: Page<Deck>;
  isAssignToGroupOpen: boolean;
  isLoading: boolean;
  selection: IdMap<Deck>;
}

const initialStateTemplate: DecksState = {
  deck: undefined,
  decks: undefined,
  isAssignToGroupOpen: false,
  isLoading: true,
  selection: {},
};

const initialState: DecksState = restoreState<DecksState>(
  'groups',
  initialStateTemplate,
  localStorage
);

export const decksReducer = createReducer(
  initialState,
  on(DecksActions.getSuccess, (state, deck) => ({ ...state, deck, isLoading: false })),
  on(DecksActions.list, (state) => ({ ...state, isLoading: true })),
  on(DecksActions.create, (state) => ({ ...state, isLoading: true })),
  on(DecksActions.createSuccess, (state) => ({ ...state, isLoading: false })),
  on(DecksActions.listSuccess, (state, page) => ({ ...state, decks: page, isLoading: false })),
  on(DecksActions.toggleAssignToGroup, (state, payload) => ({
    ...state,
    isAssignToGroupOpen: payload.open,
    selection: {},
  })),
  on(DecksActions.subscribe, (state, deck) => ({
    ...state,
    selection: { ...state.selection, [deck._id]: deck },
  })),
  on(DecksActions.unsubscribe, (state, deck) => ({
    ...state,
    selection: _.omit(state.selection, deck._id),
  })),
  on(DecksActions.setSelection, (state, action) => ({
    ...state,
    selection: { ...action.ids },
  }))
);
