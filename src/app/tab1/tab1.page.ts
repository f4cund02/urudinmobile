import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../Services/rest.service';
import { Storage } from '@ionic/storage';
import { DTUser } from '../models/user/dtuser';
import { AuthService } from '../Services/auth/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userme: DTUser = new DTUser();

  constructor(
    public nav: NavController,
    public rest: RestService,
    public storage: Storage,
    private auth: AuthService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.storage.get('me')
    .then(value => {
      console.log(value);
      this.userme = value;
      return value;
    }).catch(err => {
      console.error("No se pudo obtener usuario.", err);
    })
  }

  exit() {
    this.auth.logout();
  }

  redirect1() {
    this.nav.navigateForward("misdatos");
    console.log("redirect to misdatos");
  }

  redirect2() {
    this.nav.navigateForward("billetera");
    console.log("redirect to billetera");
  }

  notificacion() {
    this.nav.navigateForward("notificacion");
    console.log("redirect to billetera");
  }

}
