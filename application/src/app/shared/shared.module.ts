import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
  declarations: [SideBarComponent, MainHeaderComponent],
  imports: [IonicModule, CommonModule],
  exports: [SideBarComponent, MainHeaderComponent],
})
export class SharedModule {}
