import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestService } from './Services/rest.service';
import { DTinformarScooter } from './models/models';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public contador = 100;
  constructor(
    private platform: Platform,
    public geo: Geolocation,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public rest: RestService
  ) {
    this.initializeApp();
    this.startBat();
    const interval2 = setInterval(function() {
      console.log('[app.component.ts] informando al servidor bateria , coords y scooterid');
      this.geo.getCurrentPosition().then((resp) => {
            let info: DTinformarScooter;
            info.bateria = this.contador; //FIXME: bateria undefined
            info.scooterid = 1; // TODO: cual seria el id de scooter
            info.latitud =  resp.coords.latitude.toString();
            info.longitud =  resp.coords.longitude.toString();
            this.rest.informarDatos(info).subscribe(
              data => {
                  console.log('[app.component.ts] data: ', data);
              }, err => {
                console.error('[app.component.ts] error al obtener respuesta', err);

              });
           }).catch((error) => {
                console.log('Error sending location', error);
          });
    }.bind(this), 4000);
    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  startBat() {
    const interval = setInterval(function() {
        this.contador = this.contador - 0.1;

          // TODO:ENVIAR LOCALZIACION A SERVIDOR
          // TODO: ENVIAR TAMBIEN LA BATERIA


        if (this.contador === 20) {
          console.log('AVISO: Reportando bateria con 20 porciento');
        } else if (this.contador === 10) {
          alert('El scooter tiene 10% restante de bateria');
          console.log('AVISO: Reportando bateria con 10 porciento');
        }
    }.bind(this), 4000);
}
}
