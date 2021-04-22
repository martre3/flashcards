import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '../../store/auth/auth.actions';
import { AppState } from '../../store/app.states';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectIsAuthenticated)
      .subscribe((isAuthenticated) => (this.isAuthenticated = isAuthenticated));
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
