import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardPopoverComponent } from './card-popover.component';

describe('CardPopoverComponent', () => {
  let component: CardPopoverComponent;
  let fixture: ComponentFixture<CardPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardPopoverComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
