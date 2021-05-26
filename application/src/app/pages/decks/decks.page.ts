import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounce, debounceTime, tap } from 'rxjs/operators';
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
  activeTab = 'Active';
  query = '';
  searchSub = new Subject<string>();

  get decksToRender(): Deck[] {
    return this.isLoading ? ([{}, {}, {}, {}] as Deck[]) : this.decks;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(DecksActions.list({ page: 1, tab: this.activeTab }));
    this.store.select(fromDecks.selectDecksList).subscribe((page) => (this.decks = page.data));
    this.store
      .select(fromDecks.selectSelectedDecks)
      .subscribe((selected) => (this.selected = selected));

    this.store
      .select(fromDecks.selectIsLoading)
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.searchSub
      .pipe(
        tap(() => this.store.dispatch(DecksActions.setLoad())),
        debounceTime(750)
      )
      .subscribe((query) =>
        this.store.dispatch(DecksActions.list({ page: 1, tab: this.activeTab, query }))
      );
  }

  setTab(tab: string): void {
    this.activeTab = tab;

    this.store.dispatch(DecksActions.list({ page: 1, tab: this.activeTab, query: this.query }));
  }

  select(deck: Deck): void {
    this.store.dispatch(
      this.selected[deck._id] ? DecksActions.unsubscribe(deck) : DecksActions.subscribe(deck)
    );
  }

  search(): void {
    this.searchSub.next(this.query);
  }

  closeGroupSelection(): void {
    this.store.dispatch(DecksActions.toggleAssignToGroup({ open: false }));
  }
}
