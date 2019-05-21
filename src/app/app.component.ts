import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as models from './models/models';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public contador = 100;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.startBat();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  startBat() {
    let interval = setInterval(function() {
        this.contador--;
        if (models.enViaje) {
          //TODO:ENVIAR LOCALZIACION A SERVIDOR
          //TODO: ENVIAR TAMBIEN LA BATERIA
          this.geo.getCurrentPosition().then((resp) => {
            // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
            // this.restService.enviarLocalizacion(coords);
          }).catch((error) => {
                console.log('Error sending location', error);
          });
        }
        if (this.contador === 20) {
          console.log('AVISO: Reportando bateria con 20 porciento');
        } else if (this.contador === 10) {
          alert("El scooter tiene 10% restante de bateria");
          console.log('AVISO: Reportando bateria con 10 porciento');
        }
    }.bind(this), 4000);
}
}
