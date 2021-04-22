import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupInvitesPageRoutingModule } from './group-invites-routing.module';

import { GroupInvitesPage } from './group-invites.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GroupInvitesPageRoutingModule, SharedModule],
  declarations: [GroupInvitesPage],
})
export class GroupInvitesPageModule {}
