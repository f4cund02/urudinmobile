import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var RestService = /** @class */ (function () {
    function RestService(http, geo) {
        this.http = http;
        this.geo = geo;
    }
    RestService.prototype.userLogin = function (email) {
        console.log('Servicio: userLogin , parametro: ' + email);
        return this.http.get('http://23.20.14.36:8080/rest-api/api/cliente/login?email=' + email + '');
        // Seteo la variable modedero models.monedero = Dtuser.dinero;
    };
    RestService.prototype.userRegister = function (param) {
        var data = JSON.stringify(param);
        console.log('Servicio: userRegister , parametro: ' + JSON.stringify(param));
        return this.http.post('http://23.20.14.36:8080/rest-api/api/cliente/', data, {
            headers: {
                'content-type': 'application/json'
            }
        });
    };
    RestService.prototype.scooterGetInfo = function (id) {
        var data = id;
        console.log('Servicio: scooterGetInfo , parametro: ' + id);
        return this.http.get('http://23.20.14.36:8080/rest-api/api/scooter/' + id + '');
    };
    RestService.prototype.getGeojson = function () {
        var _this = this;
        this.geo.getCurrentPosition().then(function (resp) {
            // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
            _this.milat = resp.coords.latitude.toString();
            _this.milng = resp.coords.longitude.toString();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        //FIXME: milat y milng no las puedo cargar porque son promesas ....
        var data = {
            "latitud": "-34.9181148",
            "longitud": "-56.1665118"
        };
        return this.http.post('http://23.20.14.36:8080/rest-api/api/scooterhistorico/cercanos', data, {
            headers: {
                'content-type': 'application/json'
            }
        });
    };
    RestService.prototype.monederoAcreditar = function () {
    };
    RestService.prototype.scootersGet = function (lat, lng) {
    };
    RestService.prototype.viajeIniciar = function () {
    };
    RestService.prototype.viajeFin = function () {
    };
    RestService.prototype.viajesGet = function () {
    };
    RestService.prototype.pagosGet = function () {
    };
    RestService.prototype.usuarioUpdate = function (DTuser) {
    };
    RestService.prototype.notificacionesGet = function (DTuser) {
    };
    RestService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Geolocation])
    ], RestService);
    return RestService;
}());
export { RestService };
//# sourceMappingURL=rest.service.js.map