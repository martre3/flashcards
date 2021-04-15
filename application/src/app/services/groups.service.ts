import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationOptions } from '../models/pagination/pagination-options';
import { Group } from '../models/group';
import { toHttpParams } from '../utils/to-http-params';
import { Page } from '../models/pagination/page';

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
}
