import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { AppState } from '../../../store/app.states';
import { fromGroup, selectActiveGroup } from '../../../store/groups/groups.selectors';
import { GroupsActions } from '../../../store/groups/groups.actions';
import { User } from '../../../models/user';
import { Page } from '../../../models/pagination/page';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss'],
})
export class GroupUsersComponent implements OnInit {
  users: Page<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
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
}
