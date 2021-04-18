import { Deck } from './deck';

export interface DeckSubscription {
  _id: string;
  deck: Deck;
  active: boolean;
}
