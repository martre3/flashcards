import { createReducer, on } from '@ngrx/store';
import { updateRouterState } from './router.actions';

export interface RouterState {
  params: { [key: string]: string };
  queryParams: { [key: string]: string };
}

const initialState: RouterState = {
  params: {},
  queryParams: {},
};

export const routerReducer = createReducer(
  initialState,
  on(updateRouterState, (_, newState) => ({
    params: { ...newState.params },
    queryParams: newState.queryParams,
  }))
);
