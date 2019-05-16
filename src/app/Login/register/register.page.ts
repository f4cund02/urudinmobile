import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Services/rest.service';
import { DTuser, DTnewuser } from '../../models/models';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(public rest: RestService,
              public navctrl: NavController,
              public storage: Storage) { }



  public registrar(form) {
    let aux: DTnewuser;
    aux = form.value as DTnewuser;

    this.rest.userRegister(aux).subscribe(
      data => {
          const usu = data as DTuser;
          console.log('su nuevo id es : ', usu.id);
          this.navctrl.navigateForward('/tabs/tab2');
          this.storage.set('me', usu);
      }, err => {
        alert('Ya existe un usuario con ese email , por favor vuelva a ingresarlo');
      }
    );

  }

}
