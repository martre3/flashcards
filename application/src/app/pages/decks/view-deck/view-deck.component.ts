import { Component, OnInit } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Deck } from '../../../models/deck';
import { User } from '../../../models/user';
import { DecksActions } from '../../../store/decks/decks.actions';
import { AppState } from '../../../store/app.states';
import { fromDecks } from '../../../store/decks/decks.selectors';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.scss'],
})
export class ViewDeckComponent implements OnInit {
  id: string;

  deck: Deck;

  // deck: Deck = {
  //   title: 'English / Lithuanian',
  //   totalCards: 5,
  //   description:
  //     'A Study set containing basic english word. Ideal for beginners. Mokymosi rinkinys skirtas mokintis anglų kalbą. Atsakymai lietuvių kalba.',
  //   owner: {
  //     name: 'Martynas Treinys',
  //     displayName: 'martre3',
  //   } as User,
  // } as Deck;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
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
}
