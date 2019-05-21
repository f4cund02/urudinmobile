import { Component, OnInit } from '@angular/core';
import { DTuser } from 'src/app/models/models';
import { Storage } from '@ionic/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';



@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {
  monto : number;
  userme: DTuser;

  constructor(public storage: Storage,
              public paypal: PayPal) {
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
    
    const payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
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
        });
  }

}
