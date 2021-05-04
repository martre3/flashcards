import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppState } from '../../../store/app.states';
import { CreateGroup, GroupsActions } from '../../../store/groups/groups.actions';
import { selectActiveGroup } from '../../../store/groups/groups.selectors';

@Component({
  selector: 'app-modify-group',
  templateUrl: './modify-group.component.html',
  styleUrls: ['./modify-group.component.scss'],
})
export class ModifyGroupComponent implements OnInit {
  id: string;
  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(''),
    });

    this.route.paramMap
      .pipe(
        filter((params) => !!params.get('id')),
        tap((params: ParamMap) => (this.id = params.get('id'))),
        tap(() => this.store.dispatch(GroupsActions.get({ id: this.id }))),
        switchMap(() => this.store.select(selectActiveGroup))
      )
      .subscribe((group) => {
        this.form.patchValue(group);
      });
  }

  saveOrUpdate(): void {
    this.store.dispatch(new CreateGroup(this.form.value));
  }
}
