import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { AppState } from '../../../store/app.states';
import { Login, Logout, SignUp } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  userForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private store: Store<AppState>, private authService: AuthService) {}

  register(): void {
    this.store.dispatch(new SignUp(this.userForm.value));
  }

  login(): void {
    this.store.dispatch(new Login(this.userForm.value));
  }

  me(): void {
    this.authService.me().subscribe(() => {});
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
