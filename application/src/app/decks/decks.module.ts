import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { DecksPageRoutingModule } from './decks-routing.module';

import { DecksPage } from './decks.page';
import { SharedModule } from '../shared/shared.module';
import { ModifyDeckComponent } from './modify-deck/modify-deck.component';
import { ModifyDeckCardComponent } from './modify-deck-card/modify-deck-card.component';
import { CardPopoverComponent } from './card-popover/card-popover.component';

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
  declarations: [DecksPage, ModifyDeckComponent, ModifyDeckCardComponent, CardPopoverComponent],
})
export class DecksPageModule {}
