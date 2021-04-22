import { Card } from './card';

export interface Deck {
  _id: string;
  title: string;
  cards: Card[];
  totalCards: number;
}
