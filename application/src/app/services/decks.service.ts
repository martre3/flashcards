import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck';
import { PaginationOptions } from '../models/pagination/pagination-options';
import { toHttpParams } from '../utils/to-http-params';
import { Page } from '../models/pagination/page';
import { DeckSubscription } from '../models/deck-subscription';
import { Comment } from '../models/comment';

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

  getUserSubscriptions(): Observable<string[]> {
    return this.http.get<string[]>(`/api/decks/subscriptions`);
  }

  getGroupSubscriptions(groupId: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/groups/${groupId}/decks/subscriptions`);
  }

  subscribe(id: string, groupId: string = undefined): Observable<void> {
    return this.http.post<void>(`${this.getGroupOrDefaultUrl(id, groupId)}/subscribe`, {});
  }

  unsubscribe(id: string, groupId: string = undefined): Observable<void> {
    return this.http.post<void>(`${this.getGroupOrDefaultUrl(id, groupId)}/unsubscribe`, {});
  }

  rate(id: string, rating: number): Observable<Deck> {
    return this.http.post<Deck>(`/api/decks/${id}/rate`, { rating });
  }

  listComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/api/decks/${id}/comments`);
  }

  createComment(id: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`/api/decks/${id}/comments`, { message: comment.message });
  }

  private getGroupOrDefaultUrl = (id: string, groupId: string = undefined): string =>
    groupId ? `/api/groups/${groupId}/decks/${id}` : `/api/decks/${id}`;
}
