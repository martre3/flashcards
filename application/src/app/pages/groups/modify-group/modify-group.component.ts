import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppState } from '../../../store/app.states';
import { CreateGroup, GetGroup } from '../../../store/groups/groups.actions';
import { selectActiveGroup } from '../../../store/groups/groups.selectors';
import { GroupInvitation } from '../../../models/group-invitation';
import {
  selectGroupInvites,
  selectUserGroupInvites,
} from '../../../store/group-invitations/group-invitations.selectors';
import {
  ChangeGroupInvitationStatus,
  GetGroupInvites,
  GetUserGroupInvitations,
  InviteToGroup,
} from '../../../store/group-invitations/group-invitations.actions';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';
import { GroupInvitationStatus } from '../../../models/types/group-invitation-status';

@Component({
  selector: 'app-modify-group',
  templateUrl: './modify-group.component.html',
  styleUrls: ['./modify-group.component.scss'],
})
export class ModifyGroupComponent implements OnInit {
  id: string;
  form: FormGroup;
  inviteForm: FormGroup = new FormGroup({
    identifier: new FormControl(''),
  });

  invites: GroupInvitation[] = [];
  userInvites: GroupInvitation[] = [];

  colorMap = {
    accepted: 'success',
    pending: 'warning',
    declined: 'danger',
    blocked: 'danger',
    canceled: 'medium',
  };

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(''),
    });

    this.store
      .select(selectGroupInvites)
      .pipe(filter((page) => !!page))
      .subscribe((page) => (this.invites = page.data));

    this.store
      .select(selectUserGroupInvites)
      .pipe(filter((page) => !!page))
      .subscribe((page) => (this.userInvites = page.data));

    this.store
      .select(selectCurrentUser)
      .pipe(filter((page) => !!page))
      .subscribe((user) =>
        this.store.dispatch(new GetUserGroupInvitations({ userId: user._id, options: { page: 1 } }))
      );

    this.route.paramMap
      .pipe(
        filter((params) => !!params.get('id')),
        tap((params: ParamMap) => (this.id = params.get('id'))),
        tap(() => this.store.dispatch(new GetGroup(this.id))),
        switchMap(() => this.store.select(selectActiveGroup))
      )
      .subscribe((group) => {
        this.store.dispatch(new GetGroupInvites({ groupId: this.id, options: { page: 1 } }));

        this.form.patchValue(group);
      });
  }

  invite(): void {
    this.store.dispatch(new InviteToGroup({ groupId: this.id, ...this.inviteForm.value }));
  }

  setStatus(invitation: GroupInvitation, newStatus: GroupInvitationStatus): void {
    this.store.dispatch(new ChangeGroupInvitationStatus({ ...invitation, status: newStatus }));
  }

  saveOrUpdate(): void {
    this.store.dispatch(new CreateGroup(this.form.value));
  }
}
