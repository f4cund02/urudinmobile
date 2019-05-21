import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RestService } from '../../Services/rest.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(rest, navctrl, storage) {
        this.rest = rest;
        this.navctrl = navctrl;
        this.storage = storage;
    }
    RegisterPage.prototype.registrar = function (form) {
        var _this = this;
        var aux;
        aux = form.value;
        this.rest.userRegister(aux).subscribe(function (data) {
            var usu = data;
            console.log('su nuevo id es : ', usu.id);
            _this.navctrl.navigateForward('/tabs/tab2');
            _this.storage.set('me', usu);
        }, function (err) {
            alert('Ya existe un usuario con ese email , por favor vuelva a ingresarlo');
        });
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [RestService,
            NavController,
            Storage])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map