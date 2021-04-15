import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyDeckCardComponent } from './modify-deck-card.component';

describe('ModifyDeckCardComponent', () => {
  let component: ModifyDeckCardComponent;
  let fixture: ComponentFixture<ModifyDeckCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDeckCardComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyDeckCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
