import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './Login/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './Login/login/login.module#LoginPageModule' },
  { path: 'billetera', loadChildren: './miperfil/billetera/billetera.module#BilleteraPageModule' },
  { path: 'misdatos', loadChildren: './miperfil/misdatos/misdatos.module#MisdatosPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
