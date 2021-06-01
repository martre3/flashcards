import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecksPage } from './decks.page';
import { ModifyDeckComponent } from './modify-deck/modify-deck.component';
import { FormState } from '../../models/types/form-state';
import { StudyComponent } from './study/study.component';
import { ViewDeckComponent } from './view-deck/view-deck.component';
import { CommentsComponent } from './comments/comments.component';
import {AssignComponent} from "./assign/assign.component";

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
    path: ':id/edit',
    component: ModifyDeckComponent,
    data: {
      state: FormState.Edit,
    },
  },
  {
    path: ':id',
    component: ViewDeckComponent,
  },
  {
    path: ':id/study',
    component: StudyComponent,
  },
  {
    path: ':id/comments',
    component: CommentsComponent,
  },
  {
    path: ':id/assign',
    component: AssignComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecksPageRoutingModule {}
