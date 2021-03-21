import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  createOrUpdate(card: Card, deckId: string): Observable<Card> {
    return card._id ? this.update(card, deckId) : this.create(card, deckId);
  }

  create(card: Card, deckId: string): Observable<Card> {
    return this.http.post<Card>(`/api/decks/${deckId}/cards`, card);
  }

  update(card: Card, deckId: string): Observable<Card> {
    return this.http.patch<Card>(`/api/decks/${deckId}/cards/${card._id}`, card);
  }

  delete(card: Card, deckId: string): Observable<void> {
    return this.http.delete<void>(`/api/decks/${deckId}/cards/${card._id}`);
  }
}
