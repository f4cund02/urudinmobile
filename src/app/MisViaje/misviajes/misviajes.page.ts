import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { RestService } from '../../Services/rest.service';
import { DTinfoviaje } from '../../models/models';

@Component({
  selector: 'app-misviajes',
  templateUrl: './misviajes.page.html',
  styleUrls: ['./misviajes.page.scss'],
})
export class MisviajesPage implements OnInit {

  constructor( private storage: Storage,
    private auth : AuthService,
    public restservice: RestService) { }

    ClintId : number = 0 ;
    InfoviajeDT: DTinfoviaje[] = [];


    ngOnInit() {
      this.storage.get("me").then(
        response => {
          this.ClintId = response.id;
          this.restservice.viajesGet(this.ClintId).subscribe(
            (result : DTinfoviaje[]) => {
            this.InfoviajeDT = result;
          });
        
        }
      ); 
    }
  
  
    getStringDate(timestamp) {
      let date=new Date(timestamp);  
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
      //return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      //return date.toLocaleString("es-UY", {timeZone: "America/Montevideo"});;
    }

    getStringDateCorto(timestamp) {
      let date=new Date(timestamp);  
      //return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      //return date.toLocaleString("es-UY", {timeZone: "America/Montevideo"});;
    }
}
