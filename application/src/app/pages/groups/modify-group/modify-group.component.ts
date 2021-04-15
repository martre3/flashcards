import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.states';
import { CreateGroup } from '../../../store/groups/groups.actions';

@Component({
  selector: 'app-modify-group',
  templateUrl: './modify-group.component.html',
  styleUrls: ['./modify-group.component.scss'],
})
export class ModifyGroupComponent implements OnInit {
  form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(''),
    });
  }

  saveOrUpdate(): void {
    this.store.dispatch(new CreateGroup(this.form.value));
  }
}
