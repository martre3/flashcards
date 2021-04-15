import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AuthActionTypes, LoginSuccess, SignUpSuccess } from './auth.actions';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { toPayload } from '../store-utils';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map(toPayload),
      switchMap((user: User) => this.authService.login(user)),
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
        map((toast) => toast.present())
      ),
    { dispatch: false }
  );
}
