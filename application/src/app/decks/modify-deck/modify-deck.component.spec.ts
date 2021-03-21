import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyDeckComponent } from './modify-deck.component';

describe('ModifyDeckComponent', () => {
  let component: ModifyDeckComponent;
  let fixture: ComponentFixture<ModifyDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDeckComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
