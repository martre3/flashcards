import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsPageRoutingModule } from './groups-routing.module';
import { GroupsPage } from './groups.page';
import { SharedModule } from '../../shared/shared.module';
import { ModifyGroupComponent } from './modify-group/modify-group.component';
import { GroupDecksComponent } from './group-decks/group-decks.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { GroupInfoComponent } from './group-info/group-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GroupsPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    GroupsPage,
    ModifyGroupComponent,
    GroupDecksComponent,
    GroupUsersComponent,
    GroupInfoComponent,
    ViewGroupComponent,
  ],
})
export class GroupsPageModule {}
