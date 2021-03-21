import { CardType } from '../types/card-type';

export interface CardUpdatedEvent {
  type: 'started' | 'type-changed' | 'deleted';
  newType?: CardType;
}
