import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { toPayload } from '../store-utils';
import { GroupInvitationPayload } from '../../models/store/group-invitation.payload';
import { GroupInvitationsService } from '../../services/group-invitations.service';
import {
  GetGroupInvitesSuccess,
  GetUserGroupInvitationsSuccess,
  GroupInvitationsActionTypes,
  InviteToGroupSuccess,
} from './group-invitations.actions';
import { GroupInvitation } from '../../models/group-invitation';
import { GetPagePayload } from '../../models/store/get-page.payload';

@Injectable()
export class GroupInvitationsEffects {
  constructor(private actions: Actions, private groupInvitationService: GroupInvitationsService) {}

  inviteToGroup$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupInvitationsActionTypes.CREATE),
      map(toPayload),
      switchMap((payload: GroupInvitationPayload) =>
        this.groupInvitationService.create(payload.groupId, payload.identifier)
      ),
      map((invitation) => new InviteToGroupSuccess(invitation))
    )
  );

  getGroupInvites$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupInvitationsActionTypes.GET_GROUP_LIST),
      map(toPayload),
      switchMap((payload: GetPagePayload) =>
        this.groupInvitationService.getGroup(payload.groupId, payload.options)
      ),
      map((page) => new GetGroupInvitesSuccess(page))
    )
  );

  getUserInvites$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupInvitationsActionTypes.GET_USER_LIST),
      map(toPayload),
      switchMap((payload: GetPagePayload) =>
        this.groupInvitationService.getUser(payload.userId, payload.options)
      ),
      map((page) => new GetUserGroupInvitationsSuccess(page))
    )
  );

  cancel$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(GroupInvitationsActionTypes.CHANGE_STATUS),
        map(toPayload),
        switchMap((payload: GroupInvitation) =>
          this.groupInvitationService.update(payload._id, {
            groupId: payload.groupId,
            status: payload.status,
          } as GroupInvitation)
        )
      ),
    { dispatch: false }
  );
}
