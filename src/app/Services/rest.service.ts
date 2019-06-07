import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as models from '../models/models';
import { DTnewuser, ResponseStartViaje, DTinfoScooter, DTfeature, DTGeometry, DTProperties, DTinformarScooter, DTnotificacion, dataStartViaje } from '../models/models';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  // milat: string;
  // milng: string;
  public latitud = "";
  public longitud = "";


  constructor(public http: HttpClient,
    public geo: Geolocation) {

  }

  apagarscooter(idscooter : number) {
    var data = JSON.stringify({"id": idscooter, "numeroserial": "QWERTY", "encendido": false,"enuso": false, "eliminado": false});
    return this.http.put('http://23.20.14.36:8080/rest-api/api/scooter/'
      , data, {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
  
  setLatitudLongitudActuales(lat, long){
    this.latitud = lat;
    this.longitud = long;
  }

  getLatitudActual(){
    return this.latitud;
  }

  getLongitudActual(){
    return this.longitud;
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
          'content-type': 'application/json'
        }
      }
    );
  }


  scooterGetInfo(id: number) {
    const data = id;
    console.log('Servicio: scooterGetInfo , parametro: ' + id);
    return this.http.get('http://urudin.tk:8080/rest-api/api/scooter/infoscan/' + id);
  }

  getScooterCercanosAmiposicionActual() {

    // LAS UBICACIONES OBETENER LAS DE 1 SOLO LUGAR 

    // this.geo.getCurrentPosition().then((resp) => {
    //   // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
    //   this.milat = resp.coords.latitude.toString();
    //   this.milng = resp.coords.longitude.toString();
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });


    //FIXME: milat y milng no las puedo cargar porque son promesas ....
    var data = {
      "latitud": this.latitud,
      "longitud": this.longitud
    };
    return this.http.post('http://23.20.14.36:8080/rest-api/api/scooterhistorico/cercanos'
      , data, {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  monederoAcreditar(iduser: number, idpago: string, monto: number) {
    var data = {
      "dtcliente" : {
        "id" : iduser
      },
      "idtransaccion" : idpago,
      "monto" : monto
    }
    console.log("[servicio monederoAcreditar]: parametros -> " + iduser + " " + idpago + " " + monto);
    return this.http.post('https://api.urudin.tk/monederohistorico'
      , data, {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  scootersGet(lat: String, lng: String) {

  }

  viajeIniciar(paramData : dataStartViaje) {
    var data = JSON.stringify(paramData);
    return this.http.post('http://api.urudin.tk:8080/rest-api/api/viaje'
      , data, {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  viajeFin(paramData : ResponseStartViaje) {
    var data = JSON.stringify(paramData);
    return this.http.put('http://api.urudin.tk:8080/rest-api/api/viaje'
      , data, {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  viajesGet(clienteid: number) {
    return this.http.get('http://urudin.tk:8080/rest-api/api/viaje/usuario/' + clienteid);
  }

  pagosGet(clienteid: number) {
    return this.http.get('http://urudin.tk:8080/rest-api/api/monederohistorico/usuariopagos/' + clienteid);
  }

  usuarioUpdate(DTuser) {

  }

  notificacionesGet(clienteid: number) {
    return this.http.get('http://urudin.tk:8080/rest-api/api/notificacion/noleidas?idcliente=' + clienteid);
  }

  marcarLeidaNotificacion(idnotificacion: number, idcliente: number) {
    return this.http.get('http://urudin.tk:8080/rest-api/api/notificacion/marcarleida?idnotificacion=' + idnotificacion + '&idcliente=' + idcliente);
  }

  informarDatos(param: DTinformarScooter) {
    const data = JSON.stringify(param);
    console.log('Servicio: informarDatos , parametro: ' + JSON.stringify(param));
    return this.http.post('http://urudin.tk:8080/rest-api/api/scooterhistorico/registro'
      , data, {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }


}
