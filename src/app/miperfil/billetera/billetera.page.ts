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
  
  }

}
