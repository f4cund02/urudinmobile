import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public log(form){
    console.log(form.value);
    //TODO: enviar x resto el form.value y me debe devolver true o false en caso de que exista el usuario
  }

}
