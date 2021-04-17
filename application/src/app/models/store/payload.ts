import { Action } from '@ngrx/store';

export interface Payload<T> extends Action {
  payload: T;
}
