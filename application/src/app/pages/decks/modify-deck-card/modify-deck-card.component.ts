import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap, tap } from 'rxjs/operators';
import { OnChange } from 'property-watch-decorator';
import { CardPopoverComponent } from '../card-popover/card-popover.component';
import { Card } from '../../../models/card';
import { CardsService } from '../../../services/cards.service';
import { CardType } from '../../../models/types/card-type';
import { CardUpdatedEvent } from '../../../models/events/card-updated-event';

@Component({
  selector: 'app-modify-deck-card',
  templateUrl: './modify-deck-card.component.html',
  styleUrls: ['./modify-deck-card.component.scss'],
})
export class ModifyDeckCardComponent {
  @ViewChild('answerInput') answerInput;
  @Input() @OnChange('createForm') card: Card;
  @Input() deckId: string;
  @Output() updated: EventEmitter<CardUpdatedEvent> = new EventEmitter<CardUpdatedEvent>();
  @Output() typeChanged = new EventEmitter<CardType>();

  group: FormGroup;
  answerControl: FormControl;
  editing = false;

  get type(): CardType {
    return this.group.controls.type.value;
  }

  get correctAnswersControl(): FormArray {
    return this.group.controls.correctAnswers as FormArray;
  }

  constructor(
    private popoverController: PopoverController,
    private fb: FormBuilder,
    private cardsService: CardsService
  ) {}

  openMenu(e: MouseEvent): void {
    fromPromise(
      this.popoverController.create({
        component: CardPopoverComponent,
        event: e,
      })
    )
      .pipe(
        tap((popover) => popover.present()),
        switchMap((popover) => fromPromise(popover.onDidDismiss()))
      )
      .subscribe((dismissEvent) => {
        if (dismissEvent.data) {
          if (dismissEvent.data.type) {
            this.group.controls.type.setValue(dismissEvent.data.type);
            this.typeChanged.emit(dismissEvent.data.type);
            this.save();
          } else if (dismissEvent.data.deleted) {
            this.delete();
          }
        }
      });
  }

  keyDownOnAnswer(e: KeyboardEvent): void {
    switch (this.type) {
      case 'single':
      case 'single-look':
        break;
      case 'multiple':
      case 'test':
        this.addAnswer(e);
        break;
      default:
    }
  }

  addAnswer(e: KeyboardEvent): void {
    if ((e.key === 'Enter' || e.key === ',') && this.answerControl.value !== '') {
      this.answerControl = this.fb.control('');
      this.correctAnswersControl.push(this.answerControl);

      this.save();

      e.preventDefault();
    }
  }

  edit(answer: FormControl): void {
    this.editing = true;
    this.answerControl = answer;
    // this.answerInput.nativeElement.focus();
  }

  createForm(): void {
    this.group = this.fb.group({
      question: this.fb.control(''),
      type: this.fb.control(''),
      possibleAnswers: this.fb.array([]),
      correctAnswers: this.fb.array(
        this.card?.correctAnswers.length === 0
          ? [this.fb.control('')]
          : this.card.correctAnswers.map(() => this.fb.control(''))
      ),
    });

    // if (this.card.type === 'multiple') {
    //   this.correctAnswersControl.controls = [
    //     ...this.correctAnswersControl.controls,
    //     this.fb.control(''),
    //   ];
    // }

    this.group.patchValue(this.card);

    this.setActiveAnswerControl();
  }

  removeAnswer(answer: FormControl, e: MouseEvent): void {
    this.correctAnswersControl.removeAt(
      this.correctAnswersControl.controls.findIndex((c) => c === answer)
    );

    e.stopPropagation();
    this.save();
  }

  save(): void {
    const card: Card = { _id: this.card._id, ...this.group.value };
    card.correctAnswers = card.correctAnswers.filter((a) => a);

    this.cardsService.createOrUpdate(card, this.deckId).subscribe((c) => (this.card._id = c._id));
    this.updated.emit({ type: 'started' });
  }

  delete(): void {
    this.cardsService
      .delete(this.card, this.deckId)
      .subscribe(() => this.updated.emit({ type: 'deleted' }));
  }

  setTest(e: { detail: { checked: boolean } }, answer: FormControl): void {
    (this.group.controls.possibleAnswers as FormArray).controls = [answer];

    this.save();
  }

  trackAnswerBy = (index: number): number => index;

  private setActiveAnswerControl(): void {
    this.answerControl = this.correctAnswersControl.at(
      this.correctAnswersControl.length - 1
    ) as FormControl;
  }
}
