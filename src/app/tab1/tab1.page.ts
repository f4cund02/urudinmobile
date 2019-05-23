import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { Storage } from '@ionic/storage';
import { DTUser } from '../models/user/dtuser';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userme:DTUser;
  
  constructor(public nav:NavController,
                 public rest:RestService,
                    public storage:Storage){
    
  this.storage.get('me')
    .then(value => {
        let user = value as DTUser;
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
    this.storage.remove('me');
    this.nav.navigateRoot('/login');
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
