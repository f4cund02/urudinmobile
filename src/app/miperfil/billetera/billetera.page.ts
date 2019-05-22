import { Component, OnInit } from '@angular/core';
import { DTuser } from 'src/app/models/models';
import { Storage } from '@ionic/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { DTpaypalResp, DTClient, DTResponse } from '../../models/models';




@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {
  monto: number;
  userme: DTuser;

  constructor(public storage: Storage,
              public payPal: PayPal) {
    this.storage.get('me')
    .then(value => {
        const user = value as DTuser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });

  }

  ngOnInit() {
  }

  activardiv() {
     const div = document.getElementById('divoculto');
     div.style.display = '';
  }

  cancelar() {
    const div = document.getElementById('divoculto');
    div.style.display = 'none';
  }

  cargarmonto() {
   console.log(this.monto);

   console.log('Pay ????');
   this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AdhUpwbdu1ghI_4Csq34nLAWA1GRBuGJb4VI2-qXMdLShbSS-ZuoT7OdFkvPMP7eBh-8rOGK8Iih7HO9'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        const payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          var response = res as DTpaypalResp
          console.log("[PAYPAL payment response:] = state: "+response.response.state+
                          " id: "+response.response.id+
                          " time create: " + response.response.create_time);

          //TODO: ENVIAR INFORMACION DE PAGO AL SERVIDOR , AGREGAR LO ACREDITADO AL MONEDERO                 

          // Successfully paid

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
          console.error("[PAYPAL RENDER]:  Error or render dialog closed without being successful ");
        });
      }, () => {
        console.error("[PAYPAL CONFIG]: Error in configuration");
      });
    }, () => {
      console.error("[PAYPAL INIT] Error in initialization, maybe PayPal isn't supported or something else");
    });

  }

}
