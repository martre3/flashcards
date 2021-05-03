import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { SocialButtonsComponent } from './social-buttons/social-buttons.component';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, SocialButtonsComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
