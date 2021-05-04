import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewGroupComponent } from './view-group.component';

describe('ViewGroupComponent', () => {
  let component: ViewGroupComponent;
  let fixture: ComponentFixture<ViewGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGroupComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
