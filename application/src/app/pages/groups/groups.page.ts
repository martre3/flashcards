import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.states';
import { ListGroups } from '../../store/groups/groups.actions';
import { selectGroupList } from '../../store/groups/groups.selectors';
import { Group } from '../../models/group';
import { Page } from '../../models/pagination/page';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit, OnDestroy {
  page: Page<Group>;

  subscriptions = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(selectGroupList).subscribe((page) => (this.page = page))
    );
    this.store.dispatch(new ListGroups({ page: 1 }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  next(): void {
    this.store.dispatch(new ListGroups({ page: this.page.currentPage + 1 }));
  }
}
