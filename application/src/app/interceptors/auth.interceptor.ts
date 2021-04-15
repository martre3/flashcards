import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.states';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  jwt = '';

  constructor(private store: Store<AppState>) {
    this.store.select(selectAuthState).subscribe((state) => {
      this.jwt = state.jwt;
    });
  }

  intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(
      req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.jwt}`,
        },
      })
    );
  };
}
