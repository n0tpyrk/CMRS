import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MachineManagementPageRoutingModule } from './machine-management-routing.module';

import { MachineManagementPage } from './machine-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MachineManagementPageRoutingModule
  ],
  declarations: [MachineManagementPage]
})
export class MachineManagementPageModule {}
