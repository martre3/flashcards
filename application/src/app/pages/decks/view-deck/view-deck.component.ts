import { Component, OnInit } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Deck } from '../../../models/deck';
import { DecksActions } from '../../../store/decks/decks.actions';
import { AppState } from '../../../store/app.states';
import { fromDecks } from '../../../store/decks/decks.selectors';
import { DecksService } from '../../../services/decks.service';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.scss'],
})
export class ViewDeckComponent implements OnInit {
  id: string;
  isLoading;
  deck: Deck;
  deleteAction = DecksActions.delete;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.select(fromDecks.selectIsLoading).subscribe((l) => (this.isLoading = l));

    this.route.paramMap
      .pipe(
        filter((params) => !!params.get('id')),
        tap((params) => (this.id = params.get('id'))),
        tap(() => this.store.dispatch(DecksActions.get({ id: this.id }))),
        switchMap(() => this.store.select(fromDecks.selectCurrentDeck))
      )
      .subscribe((deck) => {
        this.deck = deck;
      });
  }

  rate = (rating: number): void => {
    this.store.dispatch(DecksActions.rate({ rating }));
  };

  active = (): void => {
    this.store.dispatch(
      DecksActions.setActive({
        active: this.deck.subscription ? !this.deck.subscription.active : true,
      })
    );
  };
}
