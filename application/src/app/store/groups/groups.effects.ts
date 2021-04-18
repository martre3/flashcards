import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { toPayload } from '../store-utils';
import {
  GroupsActionTypes,
  CreateGroupSuccess,
  getGroupDeckListSuccess,
  listReceived,
  GroupsActions,
} from './groups.actions';
import { GroupsService } from '../../services/groups.service';
import { PaginationOptions } from '../../models/pagination/pagination-options';
import { Group } from '../../models/group';
import { GetPagePayload } from '../../models/store/get-page.payload';
import { DecksActions } from '../decks/decks.actions';
import { AppState } from '../app.states';
import { fromDecks } from '../decks/decks.selectors';
import { selectActiveGroup } from './groups.selectors';
import { GetPayload } from '../../models/store/get.payload';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private groupsService: GroupsService
  ) {}

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupsActionTypes.CREATE),
      map(toPayload),
      switchMap((group: Group) => this.groupsService.create(group)),
      map((group) => new CreateGroupSuccess(group))
    )
  );

  listGroups$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupsActionTypes.LIST),
      switchMap((options: PaginationOptions) => this.groupsService.list(options)),
      map((page) => listReceived(page))
    )
  );

  getGroup$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupsActionTypes.GET),
      switchMap((payload: GetPayload) => this.groupsService.get(payload.id)),
      map((group) => GroupsActions.getSuccess(group))
    )
  );

  listDecks$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupsActionTypes.LIST_DECKS),
      switchMap((payload: GetPagePayload) =>
        this.groupsService.listDecks(payload.groupId, payload.options)
      ),
      map((page) => getGroupDeckListSuccess(page))
    )
  );

  listUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupsActions.listUsers),
      switchMap((payload: GetPagePayload) =>
        this.groupsService.listUsers(payload.groupId, payload.options)
      ),
      map((page) => GroupsActions.listUsersSuccess(page))
    )
  );

  updateDecksSelection$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupsActions.getSuccess),
      map((group: Group) =>
        DecksActions.setSelection({
          ids: group.deckIds?.reduce((acc, id) => {
            acc[id] = { _id: id };

            return acc;
          }, {}),
        })
      )
    )
  );

  saveDeckSelection$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(DecksActions.select, DecksActions.deselect),
        withLatestFrom(
          this.store.select(fromDecks.selectSelectedDecks),
          this.store.select(selectActiveGroup)
        ),
        switchMap(([, idMap, group]) => this.groupsService.setDecks(group._id, Object.keys(idMap)))
      ),
    { dispatch: false }
  );

  toggleDeckActive$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(GroupsActions.toggleDeckActive),
        withLatestFrom(this.store.select(selectActiveGroup)),
        switchMap(([payload, group]) =>
          this.groupsService.setActiveDeck(group._id, payload.deckId, payload.active)
        )
      ),
    { dispatch: false }
  );
}
