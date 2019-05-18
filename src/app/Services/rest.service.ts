import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as models from '../models/models';
import { DTnewuser, DTinfoScooter, DTfeature, DTGeometry, DTProperties } from '../models/models';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class RestService {

    
 milat:string;
 milng:string;


  constructor(public http: HttpClient, 
              public geo: Geolocation) { 

  }



  userLogin(email: String) {
      console.log('Servicio: userLogin , parametro: ' + email);
      return this.http.get('http://23.20.14.36:8080/rest-api/api/cliente/login?email=' + email + '');

      // Seteo la variable modedero models.monedero = Dtuser.dinero;
  }

  userRegister(param: DTnewuser) {
    const data = JSON.stringify(param);
    console.log('Servicio: userRegister , parametro: ' + JSON.stringify(param));
    return this.http.post('http://23.20.14.36:8080/rest-api/api/cliente/'
                            , data, {
                              headers: {
                                'content-type': 'application/json' }
                            }
      );
  }


  scooterGetInfo(id: number) {
    const data = id;
    console.log('Servicio: scooterGetInfo , parametro: ' + id);
    return this.http.get('http://23.20.14.36:8080/rest-api/api/scooter/' + id + '');

  }

  getGeojson(){

    this.geo.getCurrentPosition().then((resp) => {
      // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
       this.milat = resp.coords.latitude.toString();
       this.milng = resp.coords.longitude.toString();

        
    }).catch((error) => {
          console.log('Error getting location', error);
        });


        //FIXME: milat y milng no las puedo cargar porque son promesas ....
    var data = {
      "latitud": "-34.9181148",
      "longitud" : "-56.1665118"
    };
    return this.http.post('http://23.20.14.36:8080/rest-api/api/scooterhistorico/cercanos'
                            , data, {
                              headers: {
                                'content-type': 'application/json' }
                            }
      );
  }

  monederoAcreditar() {

  }

  scootersGet(lat: String, lng: String) {

  }

  viajeIniciar() {

  }

  viajeFin() {

  }

  viajesGet() {

  }

  pagosGet() {

  }

  usuarioUpdate(DTuser) {

  }

  notificacionesGet(DTuser) {

  }

  
}
