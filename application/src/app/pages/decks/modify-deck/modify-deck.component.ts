import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IonSlides } from '@ionic/angular';
import {from, of} from 'rxjs';
import { DecksService } from '../../../services/decks.service';
import { FormState } from '../../../models/types/form-state';
import { Card } from '../../../models/card';
import { CardType } from '../../../models/types/card-type';
import { CardUpdatedEvent } from '../../../models/events/card-updated-event';
import { AppState } from '../../../store/app.states';
import { DecksActions } from '../../../store/decks/decks.actions';
import { fromDecks } from '../../../store/decks/decks.selectors';

@Component({
  selector: 'app-modify-deck',
  templateUrl: './modify-deck.component.html',
  styleUrls: ['./modify-deck.component.scss'],
})
export class ModifyDeckComponent implements OnInit {
  @ViewChild(IonSlides) slider: IonSlides;

  deck = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
    isPublic: this.fb.control(false),
  });

  cards: Card[] = [];
  id: string;
  state: FormState;
  defaultType: CardType = 'single';
  isLoading: boolean;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false,
  };

  constructor(
    private store: Store<AppState>,
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

    this.store.select(fromDecks.selectCurrentDeck)
        .subscribe((deck) => this.id = deck._id);

    this.store
      .select(fromDecks.selectIsLoading)
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.route.paramMap
      .pipe(
        filter((params) => !!params.get('id')),
        tap((params) => (this.id = params.get('id'))),
        tap(() => this.store.dispatch(DecksActions.get({ id: this.id }))),
        switchMap(() => this.decksService.get(this.id))
      )
      .subscribe((deck) => {
        this.deck.patchValue(deck);
        this.cards = [...deck.cards];

        if (this.cards.length > 0) {
          this.addNewCard();
        }
      });
  }

  addNewCard(): void {
    this.cards = [...this.cards, { type: this.defaultType, correctAnswers: [] } as Card];
  }

  onCardUpdated(event: CardUpdatedEvent, card: Card, isLast: boolean): void {
    if (!event) {
      return;
    }

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
    of({})
      .pipe(delay(1000))
      .subscribe(() => this.slider.slideTo(1));

    this.store.dispatch(DecksActions.create({ _id: this.id, ...this.deck.value }));
  }

  setInitialType(initialType: CardType): void {
    this.defaultType = initialType;
    this.addNewCard();
  }
}
