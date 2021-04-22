import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  fromGroupInvitations,
  selectUserGroupInvites,
} from '../../store/group-invitations/group-invitations.selectors';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import {
  ChangeGroupInvitationStatus,
  GetUserGroupInvitations,
} from '../../store/group-invitations/group-invitations.actions';
import { AppState } from '../../store/app.states';
import { GroupInvitation } from '../../models/group-invitation';
import { GroupInvitationStatus } from '../../models/types/group-invitation-status';

@Component({
  selector: 'app-group-invites',
  templateUrl: './group-invites.page.html',
  styleUrls: ['./group-invites.page.scss'],
})
export class GroupInvitesPage implements OnInit {
  userInvites: GroupInvitation[] = [];
  isLoading = true;

  get invites(): GroupInvitation[] {
    return this.isLoading ? ([{}, {}, {}, {}] as GroupInvitation[]) : this.userInvites;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectUserGroupInvites)
      .pipe(filter((page) => !!page))
      .subscribe((page) => (this.userInvites = page.data));

    this.store
      .select(fromGroupInvitations.selectIsLoading)
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.store
      .select(selectCurrentUser)
      .pipe(filter((user) => !!user))
      .subscribe((user) =>
        this.store.dispatch(new GetUserGroupInvitations({ userId: user._id, options: { page: 1 } }))
      );
  }

  setStatus(invitation: GroupInvitation, newStatus: GroupInvitationStatus): void {
    this.store.dispatch(new ChangeGroupInvitationStatus({ ...invitation, status: newStatus }));
    this.userInvites = this.userInvites.filter((i) => i._id !== invitation._id);
  }
}
