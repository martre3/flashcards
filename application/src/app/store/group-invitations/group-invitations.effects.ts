import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import { of } from 'rxjs';
import { toPayload } from '../store-utils';
import { GroupInvitationPayload } from '../../models/store/group-invitation.payload';
import { GroupInvitationsService } from '../../services/group-invitations.service';
import {
  FailedAction,
  GetGroupInvitesSuccess,
  GetUserGroupInvitationsSuccess,
  GroupInvitationsActionTypes,
  InviteToGroupSuccess,
} from './group-invitations.actions';
import { GroupInvitation } from '../../models/group-invitation';
import { GetPagePayload } from '../../models/store/get-page.payload';

@Injectable()
export class GroupInvitationsEffects {
  constructor(
    private actions: Actions,
    private groupInvitationService: GroupInvitationsService,
    private toastController: ToastController
  ) {}

  inviteToGroup$ = createEffect(() =>
    this.actions.pipe(
      ofType(GroupInvitationsActionTypes.CREATE),
      map(toPayload),
      switchMap((payload: GroupInvitationPayload) =>
        this.groupInvitationService.create(payload.groupId, payload.identifier).pipe(
          map((invitation) => new InviteToGroupSuccess(invitation as GroupInvitation)),
          catchError((e) => {
            this.toastController
              .create({
                message: e.error.errors.identifier[0],
                position: 'top',
                color: 'warning',
                duration: 3000,
              })
              .then((t) => t.present());

            return of(new FailedAction());
          })
        )
      )
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
      delay(500),
      switchMap((payload: GetPagePayload) =>
        this.groupInvitationService.getUser(payload.userId, payload.options)
      ),
      map((page) => new GetUserGroupInvitationsSuccess(page))
    )
  );

  changeStatus = createEffect(
    () =>
      this.actions.pipe(
        ofType(GroupInvitationsActionTypes.CHANGE_STATUS),
        map(toPayload),
        switchMap((payload: GroupInvitation) =>
          this.groupInvitationService.update(payload._id, {
            groupId: payload.groupId,
            status: payload.status,
          } as GroupInvitation)
        ),
        switchMap((invitation) =>
          fromPromise(
            this.toastController.create({
              message: {
                accepted: 'You have joined a new group',
                declined: 'Invitation has been declined',
                blocked: 'You have blocked this group',
                canceled: 'Invitation has been canceled',
              }[invitation.status],
              position: 'top',
              color: 'success',
              duration: 3000,
            })
          )
        ),
        map((toast) => toast.present())
      ),
    { dispatch: false }
  );
}
