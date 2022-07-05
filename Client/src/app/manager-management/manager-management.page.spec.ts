import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerManagementPage } from './manager-management.page';

describe('ManagerManagementPage', () => {
  let component: ManagerManagementPage;
  let fixture: ComponentFixture<ManagerManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
