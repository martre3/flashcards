import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { of } from 'rxjs';
import {
  AuthActions,
  AuthActionTypes,
  LoginSuccess,
  SignUpSuccess,
  UpdateCurrentUserSuccess,
} from './auth.actions';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { toPayload } from '../store-utils';
import { AppState } from '../app.states';
import { selectAuthenticationToken } from './auth.selectors';
import { SocialLoginPayload } from '../../models/store/social-login.payload';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private store: Store<AppState>,
    private socialAuthService: SocialAuthService
  ) {}

  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map(toPayload),
      switchMap((user: User) => this.authService.login(user)),
      tap(() => this.router.navigate(['/decks'])),
      map((response) => new LoginSuccess(response))
    )
  );

  socialLogin$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.socialLogin),
      switchMap((payload: SocialLoginPayload) =>
        fromPromise(this.socialAuthService.signIn(payload.provider))
      ),
      map((socialUser) => AuthActions.socialLoginSuccess(socialUser))
    )
  );

  socialLoginSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.socialLoginSuccess),
      switchMap((socialUser) =>
        this.authService.access(socialUser.provider.toLowerCase(), socialUser.authToken)
      ),
      map((response) => new LoginSuccess(response))
    )
  );

  signUp$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.SIGNUP),
      map(toPayload),
      switchMap((user: User) => this.authService.register(user)),
      map(() => new SignUpSuccess())
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        switchMap(() =>
          fromPromise(
            this.toastController.create({
              message: 'Registration successful',
              position: 'top',
              color: 'success',
              duration: 3000,
            })
          )
        ),
        map((toast) => toast.present()),
        tap(() => this.router.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );

  updateCurrentUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.UPDATE_CURRENT_USER),
      switchMap(() => this.store.select(selectAuthenticationToken)),
      filter((token) => !!token),
      switchMap(() => this.authService.me()),
      map((user) => new UpdateCurrentUserSuccess(user))
    )
  );
}
