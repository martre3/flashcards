import { User } from './user';

export interface Comment {
  _id: string;
  message: string;
  deckId: string;
  user: User;
  createdAt: string;
}
