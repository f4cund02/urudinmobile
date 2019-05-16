import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Services/rest.service';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as models from '../../models/models';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public rest: RestService,
              private navctrl: NavController,
                private storage : Storage) { }

  ngOnInit() {
  }

  public logueo(form) {
    let aux = Object.values(form.value);
    console.log(aux[0]);
    this.rest.userLogin(aux[0].toString())
      .subscribe(data => {
          var usuario = <models.DTuser>data;
          console.log('usuario logueado : '+usuario);
          this.storage.set('me',usuario);
          this.navctrl.navigateForward('/tabs/tab2');
      },err => {
        alert("Error al iniciar sesion , ingrese un usuario ya registrado");
        
      
      });

    // TODO: enviar x rest el form.value y me debe devolver true o false en caso de que exista el usuario
    // this.navctrl.navigateForward('/tabs/tab2');

  }

}
