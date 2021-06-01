import {Component, Input, OnInit} from '@angular/core';
import { Group } from '../../../models/group';
import {fromGroup} from "../../../store/groups/groups.selectors";
import {AppState} from "../../../store/app.states";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss'],
})
export class GroupInfoComponent implements OnInit {
  @Input() group: Group;

  usersCount = 0;
  decksCount = 0;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(fromGroup.selectUsers)
        .subscribe((user) => this.usersCount = user.total);

    this.store.select(fromGroup.selectDecks)
        .subscribe((user) => this.decksCount = user.total);
  }
}
