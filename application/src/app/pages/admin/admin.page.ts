import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionSheetController } from '@ionic/angular';
import { AppState } from '../../store/app.states';
import { AdminActions } from '../../store/admin/admin.actions';
import { fromAdmin } from '../../store/admin/admin.selectors';
import { Box } from '../../models/box';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  boxes: Box[] = [];
  interval = 0;
  editing;

  constructor(
    private store: Store<AppState>,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.store.select(fromAdmin.selectBoxes).subscribe((boxes) => (this.boxes = boxes));

    this.store.dispatch(AdminActions.listBoxes());
  }

  save(box: Box) {
    this.editing = undefined;

    this.store.dispatch(AdminActions.save({ ...box, interval: this.interval }));
  }

  create() {
    this.store.dispatch(AdminActions.createBox());
  }

  open(box: Box) {
    this.actionSheetController
      .create({
        header: 'Actions',
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              this.editing = box;
              this.interval = box.interval;
            },
          },
          {
            text: 'Delete',
            handler: () => {
              this.store.dispatch(AdminActions.deleteBox());
            },
          },
        ],
      })
      .then((p) => p.present());
  }
}
