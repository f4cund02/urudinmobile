import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { DTuser } from '../models/models';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page   {
  user:DTuser;
  
  constructor(public nav:NavController,
                 public rest:RestService,
                    public storage:Storage){

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
