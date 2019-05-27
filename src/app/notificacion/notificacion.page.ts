import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { DTnotificacion } from '../models/models';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  constructor( private storage: Storage,
    private auth : AuthService,
    public restservice: RestService) { }

    ClintId : number = 0 ;
    NotificacionesDT: DTnotificacion[] = [];
    

    ngOnInit() {
      this.storage.get("me").then(
        response => {
          this.ClintId = response.id;
          this.restservice.notificacionesGet(this.ClintId).subscribe(
            (result : DTnotificacion[]) => {
            this.NotificacionesDT = result;
          });
          
        }
      ); 


    }

    eliminar(idnotificacion : number) {
      this.restservice.marcarLeidaNotificacion(idnotificacion,this.ClintId).subscribe(
        response => {
          //refrescar pantalla

          this.restservice.notificacionesGet(this.ClintId).subscribe(
            (result : DTnotificacion[]) => {
            this.NotificacionesDT = result;
          });
          
        }
      ); 
    };

}
