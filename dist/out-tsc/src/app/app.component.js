import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as models from './models/models';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.contador = 100;
        this.initializeApp();
        this.startBat();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.startBat = function () {
        var interval = setInterval(function () {
            this.contador--;
            if (models.enViaje) {
                //TODO:ENVIAR LOCALZIACION A SERVIDOR
                //TODO: ENVIAR TAMBIEN LA BATERIA
                this.geo.getCurrentPosition().then(function (resp) {
                    // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
                    // this.restService.enviarLocalizacion(coords);
                }).catch(function (error) {
                    console.log('Error sending location', error);
                });
            }
            if (this.contador === 20) {
                console.log('AVISO: Reportando bateria con 20 porciento');
            }
            else if (this.contador === 10) {
                alert("El scooter tiene 10% restante de bateria");
                console.log('AVISO: Reportando bateria con 10 porciento');
            }
        }.bind(this), 4000);
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map