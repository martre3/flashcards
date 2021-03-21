import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecksPage } from './decks.page';

describe('DecksPage', () => {
  let component: DecksPage;
  let fixture: ComponentFixture<DecksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecksPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DecksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
