import { Component } from '@angular/core';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../store/auth/auth.actions';
import { AppState } from '../../../store/app.states';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss'],
})
export class SocialButtonsComponent {
  constructor(private store: Store<AppState>) {}

  loginGoogle(): void {
    this.store.dispatch(AuthActions.socialLogin({ provider: GoogleLoginProvider.PROVIDER_ID }));
  }
}
