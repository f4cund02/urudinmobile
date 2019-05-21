import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MisdatosPage } from './misdatos.page';
var routes = [
    {
        path: '',
        component: MisdatosPage
    }
];
var MisdatosPageModule = /** @class */ (function () {
    function MisdatosPageModule() {
    }
    MisdatosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MisdatosPage]
        })
    ], MisdatosPageModule);
    return MisdatosPageModule;
}());
export { MisdatosPageModule };
//# sourceMappingURL=misdatos.module.js.map