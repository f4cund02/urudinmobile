import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { DTuser } from '../models/models';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userme:DTuser;
  
  constructor(public nav:NavController,
                 public rest:RestService,
                    public storage:Storage){
    
   //FIXME: levanta bien el nombre en el html pero da error porque es promesa y al principio no la encuentra
  this.storage.get('me')
    .then(value => {
        let user = value as DTuser;
        let div = document.getElementById("divuser");
        console.log(user.email);
        this.userme = user;
    }).catch(err=>{
      console.error("No se pudo obtener usuario logueado", err);
    });
}

  ngOnInit() {
    
  }

  exit(){
    this.storage.set('me','');
  }

 
  redirect1(){
   this.nav.navigateForward("misdatos");
    console.log("redirect to misdatos");
    
  }

  redirect2(){
    this.nav.navigateForward("billetera");
    console.log("redirect to billetera");
  }


}
