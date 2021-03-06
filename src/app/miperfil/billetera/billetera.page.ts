import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { DTpaypalResp, DTClient, DTResponse } from '../../models/models';
import { RestService } from '../../Services/rest.service';
import { DTUser } from 'src/app/models/user/dtuser';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/Services/toast/toast.service';


@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {
  monto: number;
  userme: DTUser;

  constructor(public storage: Storage,
              public payPal: PayPal,
              private navCtrl: NavController,
              public rest: RestService,
              private toast: ToastService) {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
        this.monto = user.saldo;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });

  }

  ngOnInit() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
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

   console.log('Pay');
   this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AdhUpwbdu1ghI_4Csq34nLAWA1GRBuGJb4VI2-qXMdLShbSS-ZuoT7OdFkvPMP7eBh-8rOGK8Iih7HO9'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        console.log("Creando payment con ["+this.monto.toString()+"][USD]");
        const payment = new PayPalPayment(this.monto.toString(), 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          var response = res as DTpaypalResp
          console.log("[PAYPAL payment response:] = state: "+response.response.state+
                          " id: "+response.response.id+
                          " time create: " + response.response.create_time);

        this.rest.monederoAcreditar(this.userme.id,response.response.id,this.monto).subscribe(
            resp=>{
              var respDT = new DTUser();
              respDT = resp as DTUser;
              this.userme = respDT;
              this.toast.presentToast('Saldo acreditado.', 'success');
              this.storage.remove('me');
              this.storage.set('me', respDT);
              this.navCtrl.navigateForward('/tabs/tab2');
              //console.log("reload..");
              //location.reload();
              //this.navCtrl.navigateBack('/tabs/tab1');
            },err=>{
             
                  console.error("Error en billetera.page.ts al actualizar el saldo del usuario registrado en el storage",err);
          
          }),err=>{
              console.error("Error en billetera.page.ts  en la respuesta del servicio [monederoAcreditar]",err);

            }
        }, () => {
          console.error("[PAYPAL RENDER]:  Error or render dialog closed without being successful ");
        });
      }, () => {
        console.error("[PAYPAL CONFIG]: Error in configuration");
      });
    }, () => {
      console.error("[PAYPAL INIT] Error in initialization, maybe PayPal isn't supported or something else");
    });
      this.ngOnInit();
  }

}
