import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { IonSlides } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from '../../../store/app.states';
import { fromGroup, selectActiveGroup } from '../../../store/groups/groups.selectors';
import { GroupsActions } from '../../../store/groups/groups.actions';
import { User } from '../../../models/user';
import { Page } from '../../../models/pagination/page';
import { GroupInvitation } from '../../../models/group-invitation';
import { GroupInvitationStatus } from '../../../models/types/group-invitation-status';
import {
  ChangeGroupInvitationStatus,
  InviteToGroup,
} from '../../../store/group-invitations/group-invitations.actions';
import { selectGroupInvites } from '../../../store/group-invitations/group-invitations.selectors';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss'],
})
export class GroupUsersComponent implements OnInit {
  @ViewChild(IonSlides) slider;
  @Input() id: string;

  users: Page<User>;
  inviteForm: FormGroup = new FormGroup({
    identifier: new FormControl(''),
  });

  invites: GroupInvitation[] = [];
  userInvites: GroupInvitation[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,

  };

  colorMap = {
    accepted: 'success',
    pending: 'warning',
    declined: 'danger',
    blocked: 'danger',
    canceled: 'medium',
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectGroupInvites)
      .pipe(filter((page) => !!page))
      .subscribe((page) => (this.invites = page.data));

    this.store
      .select(selectActiveGroup)
      .pipe(
        tap((group) =>
          this.store.dispatch(GroupsActions.listUsers({ groupId: group._id, options: { page: 1 } }))
        ),
        switchMap(() => this.store.select(fromGroup.selectUsers))
      )
      .subscribe((page) => (this.users = page));
  }

  scrollTo(index: number): void {
    this.slider.slideTo(index);
  }

  setStatus(invitation: GroupInvitation, newStatus: GroupInvitationStatus): void {
    this.store.dispatch(new ChangeGroupInvitationStatus({ ...invitation, status: newStatus }));
    this.userInvites = this.userInvites.filter((i) => i._id !== invitation._id);
  }

  invite(): void {
    this.store.dispatch(new InviteToGroup({ groupId: this.id, ...this.inviteForm.value }));
  }
}
