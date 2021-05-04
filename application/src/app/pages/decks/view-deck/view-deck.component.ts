import { Component } from '@angular/core';
import { Deck } from '../../../models/deck';
import { User } from '../../../models/user';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.scss'],
})
export class ViewDeckComponent {
  deck: Deck = {
    title: 'English / Lithuanian',
    totalCards: 5,
    description:
      'A Study set containing basic english word. Ideal for beginners. Mokymosi rinkinys skirtas mokintis anglų kalbą. Atsakymai lietuvių kalba.',
    owner: {
      name: 'Martynas Treinys',
      displayName: 'martre3',
    } as User,
  } as Deck;

  rate = (rating: number): void => {
    //
  };
}
