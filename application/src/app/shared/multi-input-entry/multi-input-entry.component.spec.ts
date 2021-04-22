import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiInputEntryComponent } from './multi-input-entry.component';

describe('MultiInputEntryComponent', () => {
  let component: MultiInputEntryComponent;
  let fixture: ComponentFixture<MultiInputEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiInputEntryComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiInputEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
