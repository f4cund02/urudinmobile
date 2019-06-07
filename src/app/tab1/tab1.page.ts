import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DTUser } from '../models/user/dtuser';
import { AuthService } from '../Services/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  userme: DTUser = new DTUser();

  constructor(
    public nav: NavController,
    public storage: Storage,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
  }

  ionViewDidLoad() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
  }
ionViewWillEnter() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
  }
ionViewDidEnter() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
  }
ionViewWillLeave() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
  }
ionViewDidLeave() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
  }
ionViewWillUnload() {
    this.storage.get('me')
    .then(value => {
        const user = value as DTUser;
        this.userme = user;
    }).catch(err => {
      console.error('No se pudo obtener usuario logueado', err);
    });
  }

  setUser(user : DTUser) {
    this.userme = user;
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

  misviajes(){
    this.nav.navigateForward("misviajes");
    console.log("redirect to misviajes");
  }

  mispagos(){
    console.log("redirect to pagos");
    this.nav.navigateForward("pagos");
  }

  notificacion() {
    this.nav.navigateForward("notificacion");
    console.log("redirect to billetera");
  }

}
