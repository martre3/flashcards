import { createAction, props } from '@ngrx/store';
import { RouterState } from './router.reducer';

export enum RouterActionTypes {
  URL_CHANGED = '[ROUTER] URL_CHANGED',
}

export const updateRouterState = createAction(RouterActionTypes.URL_CHANGED, props<RouterState>());
