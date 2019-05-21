import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { Storage } from '@ionic/storage';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(nav, rest, storage) {
        var _this = this;
        this.nav = nav;
        this.rest = rest;
        this.storage = storage;
        this.storage.get('me')
            .then(function (value) {
            var user = value;
            var div = document.getElementById("divuser");
            console.log(user.email);
            _this.userme = user;
        }).catch(function (err) {
            console.error("No se pudo obtener usuario logueado", err);
        });
    }
    Tab1Page.prototype.ngOnInit = function () {
    };
    Tab1Page.prototype.exit = function () {
        this.storage.set('me', '');
    };
    Tab1Page.prototype.redirect1 = function () {
        this.nav.navigateForward("misdatos");
        console.log("redirect to misdatos");
    };
    Tab1Page.prototype.redirect2 = function () {
        this.nav.navigateForward("billetera");
        console.log("redirect to billetera");
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            RestService,
            Storage])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map