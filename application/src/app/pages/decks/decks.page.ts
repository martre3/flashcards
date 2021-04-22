import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Deck } from '../../models/deck';
import { AppState } from '../../store/app.states';
import { DecksActions } from '../../store/decks/decks.actions';
import { fromDecks } from '../../store/decks/decks.selectors';
import { IdMap } from '../../models/other/id-map';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {
  decks: Deck[] = [];
  isAssignToGroupOpened$ = this.store.select(fromDecks.selectIsAssignToGroupOpened);
  isLoading: boolean;
  selected: IdMap<Deck> = {};

  get decksToRender(): Deck[] {
    return this.isLoading ? ([{}, {}, {}] as Deck[]) : this.decks;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(DecksActions.list({ page: 1 }));
    this.store.select(fromDecks.selectDecksList).subscribe((page) => (this.decks = page.data));
    this.store
      .select(fromDecks.selectSelectedDecks)
      .subscribe((selected) => (this.selected = selected));

    this.store
      .select(fromDecks.selectIsLoading)
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }

  select(deck: Deck): void {
    this.store.dispatch(
      this.selected[deck._id] ? DecksActions.unsubscribe(deck) : DecksActions.subscribe(deck)
    );
  }

  closeGroupSelection(): void {
    this.store.dispatch(DecksActions.toggleAssignToGroup({ open: false }));
  }
}
