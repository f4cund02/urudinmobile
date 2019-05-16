import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as models from '../models/models';
import { DTnewuser } from '../models/models';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public http: HttpClient, ) { }

  

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
    /*return this.http.post('http://23.20.14.36:8080/rest-api/api/scooter/'
                            , data, {
                              headers: {
                                'content-type': 'application/json' }
                            }
      );*/
      return this.http.get('http://23.20.14.36:8080/rest-api/api/scooter/' + id + '');                         

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
