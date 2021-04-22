import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormState } from '../../models/types/form-state';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      state: FormState.Create,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
