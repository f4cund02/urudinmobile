import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public log(form){
    console.log(form.value);
    //TODO: Enviar por resto el form.value y me devuelve true 
    //o false en caso de que se pueda crear con exito el usuario.
  }

}
