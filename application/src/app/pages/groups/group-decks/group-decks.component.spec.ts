import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupDecksComponent } from './group-decks.component';

describe('GroupDecksComponent', () => {
  let component: GroupDecksComponent;
  let fixture: ComponentFixture<GroupDecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDecksComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
