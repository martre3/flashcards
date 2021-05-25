import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AppState } from '../../../store/app.states';
import { DecksActions } from '../../../store/decks/decks.actions';
import { Comment } from '../../../models/comment';
import { fromDecks } from '../../../store/decks/decks.selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  commentForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<AppState>, private toastController: ToastController) {}

  ngOnInit() {
    this.store.dispatch(DecksActions.getComments());
    this.store.select(fromDecks.selectComments).subscribe((comments) => (this.comments = comments));
  }

  create(): void {
    if (this.commentForm.valid) {
      this.store.dispatch(DecksActions.createComment(this.commentForm.value));
      this.commentForm = new FormGroup({
        message: new FormControl(''),
      });
    } else {
      fromPromise(
        this.toastController.create({
          message: 'Message is required',
          position: 'top',
          color: 'warning',
          duration: 3000,
        })
      ).subscribe((toast) => {
        toast.present();
      });
    }
  }
}
