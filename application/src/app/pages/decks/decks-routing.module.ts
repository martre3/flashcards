import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecksPage } from './decks.page';
import { ModifyDeckComponent } from './modify-deck/modify-deck.component';
import { FormState } from '../../models/types/form-state';
import { StudyComponent } from './study/study.component';

const routes: Routes = [
  {
    path: '',
    component: DecksPage,
  },
  {
    path: 'new',
    component: ModifyDeckComponent,
    data: {
      state: FormState.Create,
    },
  },
  {
    path: ':id',
    component: ModifyDeckComponent,
    data: {
      state: FormState.Edit,
    },
  },
  {
    path: ':id/study',
    component: StudyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecksPageRoutingModule {}
