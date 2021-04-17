import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../../../store/app.states';
import { getGroupDeckList } from '../../../store/groups/groups.actions';
import { selectRouterState } from '../../../store/router/router.selectors';
import { DecksActions } from '../../../store/decks/decks.actions';
import { fromGroup } from '../../../store/groups/groups.selectors';
import { Page } from '../../../models/pagination/page';
import { Deck } from '../../../models/deck';

@Component({
  selector: 'app-group-decks',
  templateUrl: './group-decks.component.html',
  styleUrls: ['./group-decks.component.scss'],
})
export class GroupDecksComponent implements OnInit {
  decks: Page<Deck>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectRouterState)
      .pipe(filter((state) => 'id' in state.params))
      .subscribe((state) =>
        this.store.dispatch(getGroupDeckList({ groupId: state.params.id, options: { page: 1 } }))
      );

    this.store.select(fromGroup.selectDecks).subscribe((page) => (this.decks = page));
  }

  addNewDecks(): void {
    this.store.dispatch(DecksActions.toggleAssignToGroup({ open: true }));
  }
}
