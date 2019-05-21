import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BilleteraPage } from './billetera.page';
var routes = [
    {
        path: '',
        component: BilleteraPage
    }
];
var BilleteraPageModule = /** @class */ (function () {
    function BilleteraPageModule() {
    }
    BilleteraPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BilleteraPage]
        })
    ], BilleteraPageModule);
    return BilleteraPageModule;
}());
export { BilleteraPageModule };
//# sourceMappingURL=billetera.module.js.map