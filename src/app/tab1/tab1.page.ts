import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public nav:NavController){

  }
  redirect1(){
    this.nav.navigateForward("misdatos");
    console.log("redirect to misdatos")
  }

  redirect2(){
    this.nav.navigateForward("billetera");
    console.log("redirect to billetera")
  }


}
