import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';
import { appStates, actions } from './app.states';
import { AuthEffects } from './auth/auth.effects';
import { GroupsEffects } from './groups/groups.effects';
import { GroupInvitationsEffects } from './group-invitations/group-invitations.effects';

export function localStorageSyncReducer(reducer: ActionReducer<unknown>): ActionReducer<unknown> {
  return localStorageSync({
    keys: Object.keys(appStates),
    rehydrate: true,
  })(reducer);
}
const metaReducers: MetaReducer<unknown, Action>[] = [localStorageSyncReducer];

@NgModule({
  imports: [
    StoreModule.forRoot(appStates, { metaReducers }),
    EffectsModule.forRoot([AuthEffects, GroupsEffects, GroupInvitationsEffects]),
  ],
  declarations: [],
  exports: [],
  providers: [...actions],
})
export class CoreStoreModule {}
