import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as models from '../models/models';
import { DTnewuser, DTinfoScooter, DTfeature, DTGeometry, DTProperties, DTinformarScooter } from '../models/models';
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
    return this.http.get('http://23.20.14.36:8080/rest-api/api/scooter/' + id + '');

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
    console.log("[servicio monederoAcreditar]: parametros -> " + iduser + " " + idpago + " " + monto);
    alert("falta implementar servicio");
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
