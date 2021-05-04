import { Card } from './card';
import { User } from './user';

export interface Deck {
  _id: string;
  title: string;
  description: string;
  cards: Card[];
  owner: User;
  ownerId: string;
  totalCards: number;
}
