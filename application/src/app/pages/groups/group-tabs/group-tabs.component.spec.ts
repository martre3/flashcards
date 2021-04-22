import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupTabsComponent } from './group-tabs.component';

describe('GroupTabsComponent', () => {
  let component: GroupTabsComponent;
  let fixture: ComponentFixture<GroupTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTabsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
