import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  constructor(private http: HttpClient) {}

  getCard(deckId: string): Observable<Card> {
    return this.http.get<Card>(`/api/study/decks/${deckId}`);
  }

  submit(cardId: string, deckId: string, answers: string[]): Observable<void> {
    return this.http.post<void>(`/api/study/decks/${deckId}/submit`, {
      cardId,
      answers,
    });
  }
}
