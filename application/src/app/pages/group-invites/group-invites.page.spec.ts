import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupInvitesPage } from './group-invites.page';

describe('GroupInvitesPage', () => {
  let component: GroupInvitesPage;
  let fixture: ComponentFixture<GroupInvitesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupInvitesPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupInvitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
