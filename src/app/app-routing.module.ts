import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Authguard } from './models/authguard/authguard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule',canActivate:[Authguard] },
  { path: 'register', loadChildren: './Login/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './Login/login/login.module#LoginPageModule' },
  { path: 'billetera', loadChildren: './miperfil/billetera/billetera.module#BilleteraPageModule',canActivate:[Authguard] },
  { path: 'misdatos', loadChildren: './miperfil/misdatos/misdatos.module#MisdatosPageModule',canActivate:[Authguard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
