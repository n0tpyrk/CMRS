import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then( m => m.UserManagementPageModule)
  },
  {
    path: 'manager-management',
    loadChildren: () => import('./manager-management/manager-management.module').then( m => m.ManagerManagementPageModule)
  },
  {
    path: 'machine-management',
    loadChildren: () => import('./machine-management/machine-management.module').then( m => m.MachineManagementPageModule)
  },
  {
    path: 'login1',
    loadChildren: () => import('./login1/login1.module').then( m => m.Login1PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
