import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { DecksPageRoutingModule } from './decks-routing.module';

import { DecksPage } from './decks.page';
import { SharedModule } from '../../shared/shared.module';
import { ModifyDeckComponent } from './modify-deck/modify-deck.component';
import { ModifyDeckCardComponent } from './modify-deck-card/modify-deck-card.component';
import { CardPopoverComponent } from './card-popover/card-popover.component';
import { StudyComponent } from './study/study.component';
import { ViewDeckComponent } from './view-deck/view-deck.component';
import { RatingComponent } from './rating/rating.component';
import { CommentsComponent } from './comments/comments.component';
import {AssignComponent} from "./assign/assign.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DecksPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    DecksPage,
    ModifyDeckComponent,
    ModifyDeckCardComponent,
    CardPopoverComponent,
    StudyComponent,
    ViewDeckComponent,
    RatingComponent,
    AssignComponent,
    CommentsComponent,
  ],
  providers: [DecimalPipe],
})
export class DecksPageModule {}
