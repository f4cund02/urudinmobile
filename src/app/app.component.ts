import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestService } from './Services/rest.service';
import { DTinformarScooter } from './models/models';
import { AuthService } from './Services/auth/auth.service';
import { Router } from '@angular/router';
import { DTInformarScooter } from './models/InformarScooter/dtinformar-scooter';


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
    public rest: RestService,
    public auth: AuthService,
    private router: Router
  ) {
    this.initializeApp();  
    this.startBat();

    const interval2 = setInterval(function() {
      //console.log('[app.component.ts] informando al servidor bateria , coords y scooterid');
      this.geo.getCurrentPosition().then((resp) => {
            let info: DTinformarScooter = new DTInformarScooter();
            info.bateria = this.contador; //FIXME: bateria undefined
            console.log(this.contador);
            info.scooterid = 2; // TODO: cual seria el id de scooter
            info.latitud =  resp.coords.latitude.toString();
            info.longitud =  resp.coords.longitude.toString();
            this.rest.setLatitudLongitudActuales(resp.coords.latitude.toString(),resp.coords.longitude.toString());
            this.rest.informarDatos(info).subscribe(
              data => {
                 // console.log('[app.component.ts] data recibida por enviar localizacion y bateria : ', data);
              }, err => {
                console.error('[app.component.ts] error al obtener respuesta', err);

              });
           }).catch((error) => {
                console.log('Error sending location', error);
          });
    }.bind(this), 6000);

    
    }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs/tab1']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }

  startBat() {
    const interval = setInterval(function() {
        this.contador = this.contador - 0.1;

        if (this.contador === 20) {
          console.log('AVISO: Reportando bateria con 20 porciento');
        } else if (this.contador === 10) {
          alert('El scooter tiene 10% restante de bateria');
          console.log('AVISO: Reportando bateria con 10 porciento');
        }
    }.bind(this), 4000);
}
}
