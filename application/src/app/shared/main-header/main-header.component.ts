import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent {
  @Input() back = false;
  @Input() ellipsis = false;
  @Input() add: string;
  @Input() done: string;
  @Input() editLink: string;
  @Input() deleteAction: any;
  @Input() delete: boolean;

  constructor(
    private location: Location,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private store: Store<AppState>
  ) {}

  async presentActionSheet() {
    const buttons = [];

    if (this.editLink) {
      buttons.push({
        text: 'Edit',
        handler: () => {
          this.router.navigate([this.editLink]);
        },
      });
    }

    if (this.delete) {
      buttons.push({
        text: 'Delete',
        handler: () => {
          this.store.dispatch(this.deleteAction());
          this.router.navigate(['/decks']);
        },
      });
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons,
    });
    await actionSheet.present();
  }

  goBack(): void {
    this.location.back();
  }
}
