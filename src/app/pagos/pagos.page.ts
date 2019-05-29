import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { DTpago } from '../models/models';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  constructor( private storage: Storage,
    private auth : AuthService,
    public restservice: RestService) { }

    ClintId : number = 0 ;
    PagosDT: DTpago[] = [];

  ngOnInit() {
    this.storage.get("me").then(
      response => {
        this.ClintId = response.id;
        this.restservice.pagosGet(this.ClintId).subscribe(
          (result : DTpago[]) => {
          this.PagosDT = result;
        });
        
      }
    ); 
  }


  // getStringDate(timestamp) {
  //   let date = new Date(timestamp);
  //   return date.toUTCString();
  // }

  getStringDate(timestamp) {
    let date=new Date(timestamp);  
    //return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    //return date.toLocaleString("es-UY", {timeZone: "America/Montevideo"});;
    
  }

}
