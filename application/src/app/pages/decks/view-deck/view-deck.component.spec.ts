import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDeckComponent } from './view-deck.component';

describe('ViewDeckComponent', () => {
  let component: ViewDeckComponent;
  let fixture: ComponentFixture<ViewDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDeckComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
