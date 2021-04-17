import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { routerNavigatedAction, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { updateRouterState } from './router.actions';

@Injectable()
export class RouterEffects {
  constructor(private actions: Actions) {}

  getParams$ = createEffect(() =>
    this.actions.pipe(
      ofType(routerNavigatedAction),
      map(({ payload }) =>
        updateRouterState({
          queryParams: this.getAllQueryParameters(payload.routerState),
          params: this.getAllRouteParameters(payload.routerState),
        })
      )
    )
  );

  private getAllRouteParameters = (
    snapshot: SerializedRouterStateSnapshot
  ): { [key: string]: string } => this.mapParameters(snapshot, 'params');

  private getAllQueryParameters = (
    snapshot: SerializedRouterStateSnapshot
  ): { [key: string]: string } => this.mapParameters(snapshot, 'queryParams');

  private mapParameters = (
    snapshot: SerializedRouterStateSnapshot,
    paramType: 'queryParams' | 'params'
  ): { [key: string]: string } => {
    let route = snapshot.root;
    const params = {};
    Object.keys(route[paramType]).forEach((key) => (params[key] = route[paramType][key]));

    while (route.firstChild) {
      route = route.firstChild;
      // eslint-disable-next-line no-loop-func
      Object.keys(route[paramType]).forEach((key) => (params[key] = route[paramType][key]));
    }

    return params;
  };
}
