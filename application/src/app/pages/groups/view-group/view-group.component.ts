import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonSlides } from '@ionic/angular';
import { GroupsActions } from '../../../store/groups/groups.actions';
import { selectActiveGroup } from '../../../store/groups/groups.selectors';
import { GetGroupInvites } from '../../../store/group-invitations/group-invitations.actions';
import { AppState } from '../../../store/app.states';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit {
  @ViewChild(IonSlides) slider;

  tabs = ['Info', 'Members', 'Decks'];
  id: string;
  form: FormGroup;

  activeTab = 'Info';
  group: Group;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => !!params.get('id')),
        tap((params: ParamMap) => (this.id = params.get('id'))),
        tap(() => this.store.dispatch(GroupsActions.get({ id: this.id }))),
        switchMap(() => this.store.select(selectActiveGroup))
      )
      .subscribe((group) => {
        this.store.dispatch(new GetGroupInvites({ groupId: this.id, options: { page: 1 } }));

        this.group = group;
      });
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
    this.slider.slideTo(this.tabs.indexOf(tab));
  }
}
