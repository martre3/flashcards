import { Deck } from './deck';

export interface GroupDeck {
  _id: string;
  deck: Deck;
  active: boolean;
}
