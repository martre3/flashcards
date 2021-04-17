import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationOptions } from '../models/pagination/pagination-options';
import { Group } from '../models/group';
import { toHttpParams } from '../utils/to-http-params';
import { Page } from '../models/pagination/page';
import { Deck } from '../models/deck';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  list(options: PaginationOptions): Observable<Page<Group>> {
    return this.http.get<Page<Group>>('/api/groups', { params: toHttpParams(options) });
  }

  get(id: string): Observable<Group> {
    return this.http.get<Group>(`/api/groups/${id}`);
  }

  create(group: Group): Observable<Group> {
    return this.http.post<Group>('/api/groups/', group);
  }

  listDecks(id: string, options: PaginationOptions): Observable<Page<Deck>> {
    return this.http.get<Page<Deck>>(`/api/groups/${id}/decks`, { params: toHttpParams(options) });
  }

  listUsers(id: string, options: PaginationOptions): Observable<Page<User>> {
    return this.http.get<Page<User>>(`/api/groups/${id}/users`, { params: toHttpParams(options) });
  }

  setDecks(id: string, deckIds: string[]): Observable<void> {
    return this.http.put<void>(`/api/groups/${id}/decks`, { ids: deckIds });
  }
}
