import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.states';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectIsAuthenticated)
      .subscribe((isAuthenticated) => (this.isAuthenticated = isAuthenticated));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.isAuthenticated);

    return this.isAuthenticated;
  }
}
