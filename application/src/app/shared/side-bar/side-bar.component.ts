import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonMenu } from '@ionic/angular';
import { Logout } from '../../store/auth/auth.actions';
import { AppState } from '../../store/app.states';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  @ViewChild(IonMenu) menu;

  isAuthenticated = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(selectIsAuthenticated)
      .subscribe((isAuthenticated) => (this.isAuthenticated = isAuthenticated));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.menu.close());
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
