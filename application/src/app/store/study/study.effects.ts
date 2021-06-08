import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { StudyService } from '../../services/study.service';
import { StudyActions } from './study.actions';
import { fromDecks } from '../decks/decks.selectors';
import { fromStudy } from './study.selectors';

@Injectable()
export class StudyEffects {
  constructor(
    private actions: Actions,
    private studyService: StudyService,
    private store: Store<AppState>
  ) {}

  getCard$ = createEffect(() =>
    this.actions.pipe(
      ofType(StudyActions.getCard),
      withLatestFrom(this.store.select(fromDecks.selectCurrentDeck)),
      switchMap(([, deck]) => this.studyService.getCard(deck._id)),
      // switchMap((deck) => this.studyService.getCard('aa')),
      map((card) => StudyActions.getCardSuccess({ card }))
    )
  );

  submit$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(StudyActions.submit),
        withLatestFrom(this.store.select(fromStudy.selectCard)),
        switchMap(([payload, card]) =>
          this.studyService.submit(card._id, card.deckId, payload.answers)
        )
      ),
    { dispatch: false }
  );
}
