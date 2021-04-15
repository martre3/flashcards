import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsPageRoutingModule } from './groups-routing.module';
import { GroupsPage } from './groups.page';
import { SharedModule } from '../../shared/shared.module';
import { ModifyGroupComponent } from './modify-group/modify-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GroupsPageRoutingModule,
    SharedModule,
  ],
  declarations: [GroupsPage, ModifyGroupComponent],
})
export class GroupsPageModule {}
