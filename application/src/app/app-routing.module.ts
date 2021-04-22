import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'decks',
    loadChildren: () => import('./pages/decks/decks.module').then((m) => m.DecksPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups/groups.module').then((m) => m.GroupsPageModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'invites',
    loadChildren: () =>
      import('./pages/group-invites/group-invites.module').then((m) => m.GroupInvitesPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '**',
    redirectTo: '/groups',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
