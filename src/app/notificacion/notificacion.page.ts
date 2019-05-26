import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  constructor( private storage: Storage,
    private auth : AuthService) { }

    ClintId : number = 0 ;

    ngOnInit() {
      this.storage.get("me").then(
        response => {
          console.log("response.id:"+response.id);
          this.ClintId = response.id;
        }
      ); 

      
    }

}
