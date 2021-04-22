import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MultiInputEntryComponent } from './multi-input-entry/multi-input-entry.component';

@NgModule({
  declarations: [SideBarComponent, MainHeaderComponent, MultiInputEntryComponent],
  imports: [IonicModule, CommonModule],
  exports: [SideBarComponent, MainHeaderComponent, MultiInputEntryComponent],
})
export class SharedModule {}
