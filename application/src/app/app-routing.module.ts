import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateRouteGuard } from './guards/CanActivateRouteGuard';

const routes: Routes = [
  {
    path: 'decks',
    loadChildren: () => import('./pages/decks/decks.module').then((m) => m.DecksPageModule),
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups/groups.module').then((m) => m.GroupsPageModule),
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminPageModule),
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: 'invites',
    loadChildren: () =>
      import('./pages/group-invites/group-invites.module').then((m) => m.GroupInvitesPageModule),
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
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
