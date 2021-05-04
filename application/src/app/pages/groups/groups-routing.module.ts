import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';
import { ModifyGroupComponent } from './modify-group/modify-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage,
  },
  {
    path: 'new',
    component: ModifyGroupComponent,
  },
  {
    path: ':id/edit',
    component: ModifyGroupComponent,
  },
  {
    path: ':id',
    component: ViewGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
