import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck';
import { PaginationOptions } from '../models/pagination/pagination-options';
import { toHttpParams } from '../utils/to-http-params';
import { Page } from '../models/pagination/page';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  constructor(private http: HttpClient) {}

  list(options: PaginationOptions): Observable<Page<Deck>> {
    return this.http.get<Page<Deck>>('/api/decks', {
      params: toHttpParams(options),
    });
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
