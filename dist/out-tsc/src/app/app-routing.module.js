import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'register', loadChildren: './Login/register/register.module#RegisterPageModule' },
    { path: 'login', loadChildren: './Login/login/login.module#LoginPageModule' },
    { path: 'billetera', loadChildren: './miperfil/billetera/billetera.module#BilleteraPageModule' },
    { path: 'misdatos', loadChildren: './miperfil/misdatos/misdatos.module#MisdatosPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map