import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PayPal } from '@ionic-native/paypal/ngx';
var BilleteraPage = /** @class */ (function () {
    function BilleteraPage(storage, paypal) {
        var _this = this;
        this.storage = storage;
        this.paypal = paypal;
        this.storage.get('me')
            .then(function (value) {
            var user = value;
            _this.userme = user;
        }).catch(function (err) {
            console.error('No se pudo obtener usuario logueado', err);
        });
    }
    BilleteraPage.prototype.ngOnInit = function () {
    };
    BilleteraPage.prototype.activardiv = function () {
        var div = document.getElementById('divoculto');
        div.style.display = '';
    };
    BilleteraPage.prototype.cancelar = function () {
        var div = document.getElementById('divoculto');
        div.style.display = 'none';
    };
    BilleteraPage.prototype.cargarmonto = function () {
        console.log(this.monto);
        /*const payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.paypal.renderSinglePaymentUI(payment).then(() => {
              // Successfully paid
              alert('Todo ok!');
              // Example sandbox response
              //
              // {
              //   "client": {
              //     "environment": "sandbox",
              //     "product_name": "PayPal iOS SDK",
              //     "paypal_sdk_version": "2.16.0",
              //     "platform": "iOS"
              //   },
              //   "response_type": "payment",
              //   "response": {
              //     "id": "PAY-1AB23456CD789012EF34GHIJ",
              //     "state": "approved",
              //     "create_time": "2016-10-03T13:33:33Z",
              //     "intent": "sale"
              //   }
              // }
            }, () => {
              // Error or render dialog closed without being successful
            });*/
    };
    BilleteraPage = tslib_1.__decorate([
        Component({
            selector: 'app-billetera',
            templateUrl: './billetera.page.html',
            styleUrls: ['./billetera.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            PayPal])
    ], BilleteraPage);
    return BilleteraPage;
}());
export { BilleteraPage };
//# sourceMappingURL=billetera.page.js.map