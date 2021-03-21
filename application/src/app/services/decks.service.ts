import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  constructor(private http: HttpClient) {}

  all(): Observable<Deck[]> {
    return this.http.get<Deck[]>('/api/decks');
  }

  createOrUpdate(deck: Deck): Observable<Deck> {
    return deck._id ? this.update(deck) : this.create(deck);
  }

  get(id: string): Observable<Deck> {
    return this.http.get<Deck>(`/api/decks/${id}`);
  }

  create(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>('/api/decks', deck);
  }

  update(deck: Deck): Observable<Deck> {
    return this.http.patch<Deck>(`/api/decks/${deck._id}`, deck);
  }
}
