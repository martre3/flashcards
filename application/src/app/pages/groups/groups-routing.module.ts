import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';
import { ModifyGroupComponent } from './modify-group/modify-group.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage,
  },
  {
    path: 'new',
    component: ModifyGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
