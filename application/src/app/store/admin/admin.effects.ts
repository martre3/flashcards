import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { AdminActions } from './admin.actions';
import { fromDecks } from '../decks/decks.selectors';
import { BoxService } from '../../services/box.service';

@Injectable()
export class AdminEffects {
  constructor(
    private actions: Actions,
    private boxService: BoxService,
    private store: Store<AppState>
  ) {}

  createBox$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AdminActions.createBox),
        withLatestFrom(this.store.select(fromDecks.selectCurrentDeck)),
        switchMap(([, deck]) => this.boxService.create())
        // map((card) => AdminActions.getCardSuccess({ card }))
      ),
    { dispatch: false }
  );
}
