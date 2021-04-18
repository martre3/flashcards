import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { AppState } from '../../../store/app.states';
import { getGroupDeckList, GroupsActions } from '../../../store/groups/groups.actions';
import { selectRouterState } from '../../../store/router/router.selectors';
import { DecksActions } from '../../../store/decks/decks.actions';
import { fromGroup } from '../../../store/groups/groups.selectors';
import { Page } from '../../../models/pagination/page';
import { Deck } from '../../../models/deck';
import { GroupDeck } from '../../../models/group-deck';

@Component({
  selector: 'app-group-decks',
  templateUrl: './group-decks.component.html',
  styleUrls: ['./group-decks.component.scss'],
})
export class GroupDecksComponent implements OnInit {
  groupDecks: Page<GroupDeck>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectRouterState)
      .pipe(filter((state) => 'id' in state.params))
      .subscribe((state) =>
        this.store.dispatch(getGroupDeckList({ groupId: state.params.id, options: { page: 1 } }))
      );

    this.store.select(fromGroup.selectDecks).subscribe((page) => (this.groupDecks = page));
  }

  addNewDecks(): void {
    this.store.dispatch(DecksActions.toggleAssignToGroup({ open: true }));
  }

  toggleActive(deck: Deck): void {
    this.store.dispatch(GroupsActions.toggleDeckActive({ deckId: deck._id, active: true }));
  }
}
