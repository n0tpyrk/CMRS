import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerManagementPage } from './manager-management.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerManagementPageRoutingModule {}
