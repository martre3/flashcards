import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { toPayload } from '../store-utils';
import {
  GroupsActionTypes,
  GroupListReceived,
  GroupReceived,
  CreateGroupSuccess,
} from './groups.actions';
import { GroupsService } from '../../services/groups.service';
import { PaginationOptions } from '../../models/pagination/pagination-options';
import { Group } from '../../models/group';

@Injectable()
export class GroupsEffects {
  constructor(private actions: Actions, private groupsService: GroupsService) {}

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
      map(toPayload),
      switchMap((options: PaginationOptions) => this.groupsService.list(options)),
      map((page) => new GroupListReceived(page))
    )
  );

  getGroup$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupsActionTypes.GET),
      map(toPayload),
      switchMap((id: string) => this.groupsService.get(id)),
      map((group) => new GroupReceived(group))
    )
  );
}
