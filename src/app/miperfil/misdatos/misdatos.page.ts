import { Component, OnInit } from '@angular/core';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/Services/user/user.service';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/Services/toast/toast.service';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

  user: DTUser = new DTUser();

  user_origin: DTUser = new DTUser();

  constructor(
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
        this.user_origin = response;
      }
    );
  }

  update() {
    if (this.hasChanged()) {
      this.toast.presentToast("Cargando...", "primary");
      this.userAPI.update(this.user).subscribe(
        result => {
          console.log(result);
          this.storage.set('me', result);
          this.toast.presentToast('Los datos han sido actualizados.', 'success');
          location.reload();
          this.navCtrl.navigateBack('/tabs/tab1');
        },
        error => {
          console.log(error);
          this.toast.presentToast('No se han podido actualizar los datos.', 'danger');
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
