import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { restoreView } from '@angular/core/src/render3';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users:any;
  
  constructor(public nav:NavController, public rest:RestService){

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
