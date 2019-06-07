import { Component, OnInit } from '@angular/core';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/Services/user/user.service';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/Services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

  user: DTUser = new DTUser();

  user_origin: DTUser = new DTUser();

  constructor(
    private router: Router,
    private storage: Storage,
    private userAPI: UserService,
    private navCtrl: NavController,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.storage.get("me").then(
      response => {
        console.log(response);
        this.user = response;
        const nuevo = new DTUser();
        nuevo.nombre = response.nombre;
        nuevo.apellido = response.apellido;
        nuevo.email = response.email;
        this.user_origin = nuevo ;
      }
    );
  }

  update() {
    console.log("this.hasChanged():"+this.hasChanged());
    if (this.hasChanged()) {
      this.toast.presentToast("Cargando...", "primary");
      this.userAPI.update(this.user).subscribe(
        result => {
          console.log(result);
          this.storage.remove('me');
          this.storage.set('me', result);
          this.toast.presentToast('Los datos han sido actualizados.', 'success');
          this.router.navigate(['/tabs/tab1']);
        },
        error => {
          this.toast.presentToast("Ocurrio un Error: " + error["error"].message,"danger");   
        }
      );
    } else {
      this.toast.presentToast("No se ha editado ningun dato.","warning");
    }
  }

  hasChanged() {
    return !(
      this.user.nombre == this.user_origin.nombre &&
      this.user.apellido == this.user_origin.apellido &&
      this.user.email == this.user_origin.email
    )
  }
}
