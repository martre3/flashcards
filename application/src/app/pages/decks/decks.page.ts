import { Component, OnInit } from '@angular/core';
import { DecksService } from '../../services/decks.service';
import { Deck } from '../../models/deck';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {
  decks: Deck[] = [];

  constructor(private decksService: DecksService) {}

  ngOnInit(): void {
    this.decksService.all().subscribe((decks) => (this.decks = decks));
  }
}
