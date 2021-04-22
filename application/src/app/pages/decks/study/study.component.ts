import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
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

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(StudyActions.getCard());
    this.store.select(fromStudy.selectCard).subscribe((card) => (this.card = card));
  }

  onButton(): void {
    if (this.showAnswers) {
      this.nextCard();

      return;
    }

    this.submit();
  }

  submit(): void {
    this.showAnswers = true;
    this.answers = [...this.answers, this.answer.value].filter((a) => a.length > 0);

    this.checkAnswers();
    this.store.dispatch(
      StudyActions.submit({
        answers: [...this.answers],
      })
    );
  }

  nextCard(): void {
    this.showAnswers = false;
    this.store.dispatch(StudyActions.getCard());
    this.answer = this.fb.control('');
    this.answers = [];
  }

  nextAnswer(e: KeyboardEvent): void {
    this.answers = [...this.answers, this.answer.value];
    this.answer = this.fb.control('');

    e.preventDefault();
  }

  getAnswerColor(answer: string): string {
    if (answer in this.results) {
      return this.results[answer] ? 'success' : 'danger';
    }

    return null;
  }

  private checkAnswers(): void {
    this.results = this.answers.reduce((acc, answer) => {
      acc[answer] = this.card.correctAnswers.includes(answer);

      return acc;
    }, {});

    this.missingAnswers = this.card.correctAnswers.filter((answer) => !(answer in this.results));
  }
}
