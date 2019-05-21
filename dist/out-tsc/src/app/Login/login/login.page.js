import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RestService } from '../../Services/rest.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var LoginPage = /** @class */ (function () {
    function LoginPage(rest, navctrl, storage) {
        this.rest = rest;
        this.navctrl = navctrl;
        this.storage = storage;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.logueo = function (form) {
        var _this = this;
        var aux = Object.values(form.value);
        console.log(aux[0]);
        this.rest.userLogin(aux[0].toString())
            .subscribe(function (data) {
            var usuario = data;
            console.log('usuario logueado : ' + usuario);
            _this.storage.set('me', usuario);
            _this.navctrl.navigateForward('/tabs/tab2');
        }, function (err) {
            alert("Error al iniciar sesion , ingrese un usuario ya registrado");
        });
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [RestService,
            NavController,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map