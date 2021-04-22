import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupInvitesPage } from './group-invites.page';

const routes: Routes = [
  {
    path: '',
    component: GroupInvitesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupInvitesPageRoutingModule {}
