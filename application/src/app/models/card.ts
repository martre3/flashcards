import { CardType } from './types/card-type';

export interface Card {
  _id: string;
  question: string;
  correctAnswers: string[];
  possibleAnswers: string[];
  type: CardType;
  deckId: string;
  // TODO
  // eslint-disable-next-line camelcase
  deck_id: string;
}
