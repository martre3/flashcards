import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ToastController } from '@ionic/angular';
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
    private decksService: DecksService,
    private toastController: ToastController
  ) {}

  list$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActionTypes.LIST),
      delay(450),
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

  create = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.create),
      switchMap((deck) => this.decksService.createOrUpdate(deck)),
      map((deck) => DecksActions.createSuccess(deck))
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

  rate$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.rate),
      withLatestFrom(this.store.select(fromDecks.selectCurrentDeck)),
      switchMap(([payload, deck]) => this.decksService.rate(deck._id, payload.rating)),
      map((subscription) => DecksActions.rateSuccess(subscription))
    )
  );

  getComments$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.getComments),
      withLatestFrom(this.store.select(fromDecks.selectCurrentDeck)),
      switchMap(([_, deck]) => this.decksService.listComments(deck._id)),
      map((comments) => DecksActions.getCommentsSuccess({ comments }))
    )
  );

  createComment$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.createComment),
      withLatestFrom(this.store.select(fromDecks.selectCurrentDeck)),
      switchMap(([payload, deck]) => this.decksService.createComment(deck._id, payload)),
      map((comment) => DecksActions.createCommentSuccess(comment))
    )
  );

  commentSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.createCommentSuccess),
      switchMap(() =>
        fromPromise(
          this.toastController.create({
            message: 'Comment created',
            position: 'top',
            color: 'success',
            duration: 3000,
          })
        )
      ),
      map((toast) => toast.present()),
      map(() => DecksActions.getComments())
    )
  );

  delete$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(DecksActions.delete),
        withLatestFrom(this.store.select(fromDecks.selectCurrentDeck)),
        switchMap(([_, deck]) => this.decksService.delete(deck._id)),
        map(() => this.router.navigate(['/decks']))
      ),
    { dispatch: false }
  );

  setActive$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActions.setActive),
      withLatestFrom(this.store.select(fromDecks.selectCurrentDeck)),
      switchMap(([payload, deck]) => this.decksService.setActive(deck._id, payload.active)),
      tap((deck) =>
        fromPromise(
          this.toastController.create({
            message: `This deck is now ${deck.subscription.active ? 'Active' : 'Inactive'}`,
            position: 'top',
            color: 'success',
            duration: 3000,
          })
        ).subscribe((toast) => toast.present())
      ),
      map((deck) => DecksActions.getSuccess(deck))
    )
  );
}
