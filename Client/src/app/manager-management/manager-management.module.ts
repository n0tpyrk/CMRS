import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerManagementPageRoutingModule } from './manager-management-routing.module';

import { ManagerManagementPage } from './manager-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerManagementPageRoutingModule
  ],
  declarations: [ManagerManagementPage]
})
export class ManagerManagementPageModule {}
