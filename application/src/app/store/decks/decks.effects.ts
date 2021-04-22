import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DecksService } from '../../services/decks.service';
import { DecksActions, DecksActionTypes } from './decks.actions';
import { ToggleAssignToGroupPayload } from '../../models/store/toggle-assign-to-group.payload';
import { AppState } from '../app.states';
import { fromDecks } from './decks.selectors';
import { selectActiveGroup } from '../groups/groups.selectors';
import { GetPayload } from '../../models/store/get.payload';

@Injectable()
export class DecksEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private router: Router,
    private decksService: DecksService
  ) {}

  list$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActionTypes.LIST),
      delay(1500),
      switchMap((options) => this.decksService.list(options)),
      switchMap((page) => [DecksActions.listSuccess(page), DecksActions.getSubscriptions()])
    )
  );

  getDeck$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.get),
      switchMap((payload: GetPayload) => this.decksService.get(payload.id)),
      map((deck) => DecksActions.getSuccess(deck))
    )
  );

  getSubscriptions$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.getSubscriptions),
      withLatestFrom(
        this.store.select(fromDecks.selectIsAssignToGroupOpened),
        this.store.select(selectActiveGroup)
      ),
      switchMap(([, isSelectOpened, group]) =>
        isSelectOpened
          ? this.decksService.getGroupSubscriptions(group._id)
          : this.decksService.getUserSubscriptions()
      ),
      map((ids) =>
        DecksActions.setSelection({
          ids: ids.reduce((acc, id) => {
            acc[id] = { _id: id };

            return acc;
          }, {}),
        })
      )
    )
  );

  openDeckSelectionForGroup$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(DecksActionTypes.TOGGLE_ASSIGN_TO_GROUP),
        filter((payload: ToggleAssignToGroupPayload) => payload.open),
        map(() => this.router.navigate(['/decks']))
      ),
    { dispatch: false }
  );

  subscribeToDeck$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(DecksActions.subscribe),
        withLatestFrom(
          this.store.select(fromDecks.selectIsAssignToGroupOpened),
          this.store.select(selectActiveGroup)
        ),
        switchMap(([deck, isSelectOpened, group]) =>
          this.decksService.subscribe(deck._id, isSelectOpened ? group._id : undefined)
        )
      ),
    { dispatch: false }
  );

  unsubscribeToDeck$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(DecksActions.unsubscribe),
        withLatestFrom(
          this.store.select(fromDecks.selectIsAssignToGroupOpened),
          this.store.select(selectActiveGroup)
        ),
        switchMap(([deck, isSelectOpened, group]) =>
          this.decksService.unsubscribe(deck._id, isSelectOpened ? group._id : undefined)
        )
      ),
    { dispatch: false }
  );
}
