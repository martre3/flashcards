import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
