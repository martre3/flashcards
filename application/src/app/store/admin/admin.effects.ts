import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { AdminActions } from './admin.actions';
import { BoxService } from '../../services/box.service';

@Injectable()
export class AdminEffects {
  constructor(
    private actions: Actions,
    private boxService: BoxService,
    private store: Store<AppState>
  ) {}

  list = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.listBoxes),
      switchMap(() => this.boxService.list()),
      // map((card) => AdminActions.getCardSuccess({ card }))
      map((boxes) => AdminActions.listBoxesSuccess({ boxes }))
    )
  );

  createBox$ = createEffect(() =>
    this.actions.pipe(
      ofType(AdminActions.createBox),
      switchMap(() => this.boxService.create()),
      // map((card) => AdminActions.getCardSuccess({ card }))
      map(() => AdminActions.listBoxes())
    )
  );

  save$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AdminActions.save),
        switchMap((box) => this.boxService.save(box))
        // map((card) => AdminActions.getCardSuccess({ card }))
      ),
    { dispatch: false }
  );
}
