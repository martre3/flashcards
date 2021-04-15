import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/responses/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', user);
  }

  me(): Observable<any> {
    return this.http.get<any>('/api/users/me');
  }
}
