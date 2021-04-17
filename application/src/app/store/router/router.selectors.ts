import { createFeatureSelector } from '@ngrx/store';
import { RouterState } from './router.reducer';

export const selectRouterState = createFeatureSelector<RouterState>('router');
