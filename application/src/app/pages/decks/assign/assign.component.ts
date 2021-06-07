import { Component, OnInit } from '@angular/core';
import {Page} from "../../../models/pagination/page";
import {Group} from "../../../models/group";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.states";
import {fromGroup, selectGroupList} from "../../../store/groups/groups.selectors";
import {listGroups} from "../../../store/groups/groups.actions";
import {GroupsService} from "../../../services/groups.service";

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss'],
})
export class AssignComponent implements OnInit {
  page: Page<Group>;
  isLoading: boolean;
  subscriptions = new Subscription();

  get groups(): Group[] {
    return this.isLoading ? ([{}, {}, {}, {}] as Group[]) : this.page.data;
  }

  constructor(private store: Store<AppState>, private groupService: GroupsService) {}

  ngOnInit(): void {
    this.subscriptions.add(
        this.store.select(selectGroupList).subscribe((page) => (this.page = page))
    );
    this.store
        .select(fromGroup.selectIsLoading)
        .subscribe((isLoading) => (this.isLoading = isLoading));

    this.store.dispatch(listGroups({ page: 1 }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  next(): void {
    this.store.dispatch(listGroups({ page: this.page.currentPage + 1 }));
  }

  c(g): void {
    g.assigned = true;
    // this.groupService.assign(g.id)
    //     .subscribe(() => g.assigned = true);
  }

}
