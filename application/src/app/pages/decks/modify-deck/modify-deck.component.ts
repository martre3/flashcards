import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DecksService } from '../../../services/decks.service';
import { FormState } from '../../../models/types/form-state';
import { Card } from '../../../models/card';
import { CardType } from '../../../models/types/card-type';
import { CardUpdatedEvent } from '../../../models/events/card-updated-event';

@Component({
  selector: 'app-modify-deck',
  templateUrl: './modify-deck.component.html',
  styleUrls: ['./modify-deck.component.scss'],
})
export class ModifyDeckComponent implements OnInit {
  deck = this.fb.group({
    title: this.fb.control(''),
    isPublic: this.fb.control(false),
  });

  cards: Card[] = [];
  id: string;
  state: FormState;
  defaultType: CardType = 'single';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private decksService: DecksService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.state = data.state;

      if (this.state === FormState.Create) {
        this.addNewCard();
      }
    });

    this.route.paramMap
      .pipe(
        filter((params) => !!params.get('id')),
        tap((params) => (this.id = params.get('id'))),
        switchMap(() => this.decksService.get(this.id))
      )
      .subscribe((deck) => {
        this.deck.patchValue(deck);
        this.cards = [...deck.cards];
        this.addNewCard();
      });
  }

  addNewCard(): void {
    this.cards = [...this.cards, { type: this.defaultType, correctAnswers: [] } as Card];
  }

  onCardUpdated(event: CardUpdatedEvent, card: Card, isLast: boolean): void {
    switch (event.type) {
      case 'type-changed':
        break;
      case 'started':
        if (isLast) {
          this.addNewCard();
        }
        break;
      case 'deleted':
        this.cards = this.cards.filter((c) => c._id !== card._id);
        break;
      default:
    }
  }

  onTypeChange(type: CardType, isLast: boolean): void {
    if (isLast) {
      this.defaultType = type;
    }
  }

  saveOrUpdate(): void {
    this.decksService.createOrUpdate(this.deck.value).subscribe(() => {});
  }
}
