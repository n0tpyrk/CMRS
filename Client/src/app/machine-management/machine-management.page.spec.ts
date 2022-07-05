import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MachineManagementPage } from './machine-management.page';

describe('MachineManagementPage', () => {
  let component: MachineManagementPage;
  let fixture: ComponentFixture<MachineManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MachineManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
