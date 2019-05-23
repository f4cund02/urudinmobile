import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { EndpointManagerService } from '../endpoints/endpoint-manager.service';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient,
    private endpoints: EndpointManagerService,
    public toastController: ToastController,
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('me').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(user: DTUser) {
    this.http.get(this.endpoints.getClientEndpoint() + '/login?email=' + user.email + '').subscribe(
      result => {
        this.storage.set('me', result).then((response) => {
          this.router.navigate(['/tabs/tab1']);
          this.authState.next(true);
        });
      },
      error => {
        this.presentToast();
      }
    );
  }

  logout() {
    this.storage.remove('me').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error al iniciar sesion.\nIngrese un usuario ya registrado.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

}