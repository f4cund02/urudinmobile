import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { EndpointManagerService } from '../endpoints/endpoint-manager.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

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
    private toast : ToastService
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

  login(user: DTUser, type: Number) {
    this.toast.presentToast("Cargando...", "primary");
    this.http.get(this.endpoints.getClientEndpoint() + '/login?email=' + user.email + '').subscribe(
      (result: DTUser) => {
        this.storage.set('me', result).then((response) => {
          this.toast.dismiss();
          this.router.navigate(['/tabs/tab1']);
          this.authState.next(true);
        });
      },
      error => {
        let msg = "";
        if (type == 1) {
          msg = 'Error al iniciar sesion.\nIngrese un usuario ya registrado.'
        } else {
          msg = 'Error en el registro.\nIntente iniciar sesión de forma normal.'
        }
        this.toast.presentToast(msg, "danger");
      }
    );
  }

  logout() {
    this.storage.remove('me').then(
      () => {
        this.router.navigate(['login']);
        this.authState.next(false);
      }
    );
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
