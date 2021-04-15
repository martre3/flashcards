import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AnimationController, PopoverController } from '@ionic/angular';
import { CardType } from '../../../models/types/card-type';

type View = 'main' | 'types' | 'delete';

@Component({
  selector: 'app-card-popover',
  templateUrl: './card-popover.component.html',
  styleUrls: ['./card-popover.component.scss'],
})
export class CardPopoverComponent {
  @ViewChild('mainList') mainList;
  @ViewChild('typeList') typesList;

  typesMap: { [key in CardType]: string } = {
    single: 'Single answer',
    multiple: 'Multiple answers',
    'single-look': 'Long answer',
    test: 'Test',
  };

  get types(): CardType[] {
    return Object.keys(this.typesMap) as CardType[];
  }

  currentView: View = 'main';

  constructor(
    private animationController: AnimationController,
    private popoverController: PopoverController,
    private changeDetector: ChangeDetectorRef
  ) {}

  changeView(newType: View): void {
    this.currentView = newType;
    this.changeDetector.detectChanges();
    const currentList = newType === 'main' ? this.mainList : this.typesList;

    this.animationController
      .create()
      .addElement(currentList.el)
      .duration(500)
      .fromTo('opacity', '0.3', '1')
      .play();
  }

  delete(): void {
    this.popoverController.dismiss({ deleted: true });
  }

  selectType(type: CardType): void {
    this.popoverController.dismiss({ type });
  }

  dismissPopover(): void {
    this.popoverController.dismiss();
  }
}
