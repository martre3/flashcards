import { CardType } from './types/card-type';

export interface Card {
  _id: string;
  question: string;
  correctAnswers: string[];
  possibleAnswers: string[];
  type: CardType;
}
