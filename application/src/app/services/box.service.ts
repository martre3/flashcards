import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Box } from '../models/box';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  constructor(private http: HttpClient) {}

  create(): Observable<void> {
    return this.http.post<void>(`/api/boxes`, {});
  }

  list(): Observable<Box[]> {
    return this.http.get<Box[]>('/api/boxes');
  }

  save(box: Box): Observable<Box> {
    return this.http.put<Box>(`/api/boxes/${box._id}`, box);
  }
}
