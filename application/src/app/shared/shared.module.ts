import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MultiInputEntryComponent } from './multi-input-entry/multi-input-entry.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [SideBarComponent, MainHeaderComponent, MultiInputEntryComponent, TabsComponent],
  imports: [IonicModule, CommonModule, RouterModule],
  exports: [SideBarComponent, MainHeaderComponent, MultiInputEntryComponent, TabsComponent],
})
export class SharedModule {}
