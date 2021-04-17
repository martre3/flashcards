import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DecksService } from '../../services/decks.service';
import { DecksActions, DecksActionTypes } from './decks.actions';
import { PaginationOptions } from '../../models/pagination/pagination-options';
import { getGroupDeckListSuccess } from '../groups/groups.actions';
import { GetPagePayload } from '../../models/store/get-page.payload';
import { ToggleAssignToGroupPayload } from '../../models/store/toggle-assign-to-group.payload';

@Injectable()
export class DecksEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private decksService: DecksService
  ) {}

  getDecks$ = createEffect(() =>
    this.actions.pipe(
      ofType(DecksActionTypes.LIST),
      switchMap((options: PaginationOptions) => this.decksService.list(options)),
      map((page) => DecksActions.listSuccess(page))
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
}
