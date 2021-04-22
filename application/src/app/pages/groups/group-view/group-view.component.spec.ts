import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupViewComponent } from './group-view.component';

describe('GroupViewComponent', () => {
  let component: GroupViewComponent;
  let fixture: ComponentFixture<GroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupViewComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
