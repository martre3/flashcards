import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { AppState } from '../../../store/app.states';
import { StudyActions } from '../../../store/study/study.actions';
import { Card } from '../../../models/card';
import { fromStudy } from '../../../store/study/study.selectors';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  card: Card;
  answer = this.fb.control('');
  answers = [];
  results = {};
  missingAnswers = [];
  showAnswers = false;

  get remainingAnswers(): number {
    return Math.max(
      0,
      this.card.correctAnswers.length - this.answers.length - (this.answer.value === '' ? 0 : 1)
    );
  }

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(StudyActions.getCard());
    this.store.select(fromStudy.selectCard).subscribe((card) => {
      this.card = card;
      this.answer = this.fb.control('');
      this.answers = [];
      this.showAnswers = false;
    });
  }

  look(): void {
    this.showAnswers = true;
  }

  vote(y: boolean): void {
    if (y) {
      this.answers = [this.card.correctAnswers[0]];
      this.submit();
    }

    this.nextCard();
  }

  onButton(): void {
    if (this.showAnswers) {
      this.nextCard();
      // Todo
      return;
    }

    this.submit();
  }

  submit(): void {
    this.showAnswers = true;

    if (this.card.type !== 'test' && this.card.type !== 'single-look') {
      this.answers = [...this.answers, this.answer.value].filter((a) => a.length > 0);
    }

    this.checkAnswers();
    this.store.dispatch(
      StudyActions.submit({
        answers: [...this.answers],
      })
    );
  }

  nextCard(): void {
    this.store.dispatch(StudyActions.getCard());
  }

  nextAnswer(e: KeyboardEvent): void {
    if (this.card.type === 'multiple') {
      this.answers = [...this.answers, this.answer.value];
      this.answer = this.fb.control('');
    }

    e.preventDefault();
  }

  checkAnswer(e: { detail: { checked: boolean } }, answer: string): void {
    if (e.detail.checked) {
      this.answers = [...this.answers, answer];
    } else {
      this.answers = this.answers.filter((a) => a !== answer);
    }
  }

  getAnswerColor(answer: string): string {
    if (answer in this.results) {
      return this.results[answer] ? 'success' : 'danger';
    }

    return 'danger';
  }

  private checkAnswers(): void {
    if (this.card.type === 'test') {
      this.results = this.card.correctAnswers.reduce((acc, a) => {
        acc[a] =
          (this.card.possibleAnswers.includes(a) && this.answers.includes(a)) ||
          (!this.card.possibleAnswers.includes(a) && !this.answers.includes(a));

        return acc;
      }, {});
    } else {
      this.results = this.answers.reduce((acc, answer) => {
        acc[answer] = (this.card.type === 'test'
          ? this.card.possibleAnswers
          : this.card.correctAnswers
        ).includes(answer);

        return acc;
      }, {});
    }
    console.log(this.results);

    this.missingAnswers = this.card.correctAnswers.filter((answer) => !(answer in this.results));
  }
}
