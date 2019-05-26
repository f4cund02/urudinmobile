import { Component, OnInit } from '@angular/core';
import { DTUser } from 'src/app/models/user/dtuser';
import { UserService } from 'src/app/Services/user/user.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ToastService } from 'src/app/Services/toast/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: DTUser = new DTUser();

  constructor(
    private userAPI: UserService,
    private auth: AuthService,
    private toast: ToastService
  ) { }

  ngOnInit() { }

  public register() {
    this.toast.presentToast("Cargando...", 'primary');
    this.userAPI.register(this.user).subscribe(
      data => {
        console.log(data);
        let u: DTUser = data;
        this.toast.dismiss();
        this.auth.login(u, 2);
      },
      error => {
        console.log(error);
        if (!error.error) {
          this.toast.presentToast("El correo ingresado ya esta siendo utilizado.", 'danger');
        } else {
          this.toast.presentToast("Algo salio mal. Intentelo de nuevo.", 'danger');
        }
      }
    );
  }

  isValid() {
    return (
      this.user.nombre.length > 0 &&
      this.user.apellido.length > 0 &&
      this.user.email.length > 0
    )
  }

}
