import { Card } from './card';
import { User } from './user';
import { DeckSubscription } from './deck-subscription';

export interface Deck {
  _id: string;
  title: string;
  description: string;
  cards: Card[];
  owner: User;
  ownerId: string;
  totalCards: number;
  rating: number;
  totalRatings: number;
  subscription: DeckSubscription;
}
