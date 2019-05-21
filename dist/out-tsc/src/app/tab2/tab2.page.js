import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { RestService } from '../Services/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(barcodeScanner, rest, geo, storage, navctrl) {
        this.barcodeScanner = barcodeScanner;
        this.rest = rest;
        this.geo = geo;
        this.storage = storage;
        this.navctrl = navctrl;
        this.milat = 0;
        this.milng = 0;
    }
    Tab2Page.prototype.ngOnInit = function () {
        this.buildmap();
        this.obtenersaldoMonedero();
    };
    Tab2Page.prototype.obtenersaldoMonedero = function () {
        var _this = this;
        this.storage.get('me').then(function (data) {
            var aux = data;
            _this.saldo = aux.saldo;
        }, function (err) {
            console.error('Error al recuperar el saldo de tu monedero', err);
        });
    };
    Tab2Page.prototype.ngAfterViewInit = function () {
    };
    Tab2Page.prototype.volver = function () {
        var div = document.getElementById('divInfo');
        div.style.display = 'none';
    };
    Tab2Page.prototype.abrirQR = function () {
        var _this = this;
        this.iniciarViaje();
        /*lo de arriba es para probar  */
        console.log('Abriendo QR cam');
        this.barcodeScanner.scan().then(function (barcodeData) {
            console.log('Barcode data', barcodeData);
            console.log(barcodeData.text);
            _this.rest.scooterGetInfo(+barcodeData.text).subscribe(function (data) {
                var scooter_scan = data;
                console.log('Serial number: ' + scooter_scan.numeroserial);
                _this.storage.set('tmpscooter', scooter_scan);
                _this.scooterinfo = scooter_scan;
            }, function (err) {
                console.error('No se pudo obtener datos del QR', err);
            });
            var div = document.getElementById('divInfo');
            div.style.display = '';
            // TODO: MOSTRAR INFO DEL SCOOTER Y ADEMAS EL SALDO DE SU MONEDERO
        }).catch(function (err) {
            console.log('Error', err);
            console.log('Debes escanearlo desde un celular , o quiza tu smartphone no tiene el plugin de cordova..');
        });
    };
    Tab2Page.prototype.buildmap = function () {
        var _this = this;
        mapboxgl.accessToken = 'pk.eyJ1IjoiZjRjdW5kMDIiLCJhIjoiY2p2aGNmemMyMDBxbzRhbzNxb3pydWV0eCJ9.wV6Ce8jWiMkdtUF-jKM8Kg';
        var map = new mapboxgl.Map({
            container: 'mapid',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-56.16324, -34.91035],
            zoom: 10
        });
        map.addControl(new mapboxgl.NavigationControl());
        // llamo funcion getGeojson
        this.rest.getGeojson().subscribe(function (data) {
            var datos = data;
            for (var i = 0; i < datos.length; i++) {
                new mapboxgl.Marker()
                    .setLngLat([+datos[i].longitud,
                    +datos[i].latitud])
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<p>Scooter n°: ' + datos[i].id + '</p> <p>Bateria : ' + datos[i].bateria + '</p>'))
                    .addTo(map);
            }
        }, function (err) {
            console.error('Hubo un error al recuperar los scooters cercanos , ', err);
        });
        // MI UBICACION//
        this.geo.getCurrentPosition().then(function (resp) {
            // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
            _this.milat = resp.coords.latitude;
            _this.milng = resp.coords.longitude;
            // this.restService.enviarLocalizacion(coords);
            new mapboxgl.Marker()
                .setLngLat([_this.milng, _this.milat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h6> YO </h6>'))
                .addTo(map);
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    Tab2Page.prototype.iniciarViaje = function () {
        alert("iniciando viaje");
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [BarcodeScanner,
            RestService,
            Geolocation,
            Storage,
            NavController])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map