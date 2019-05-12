import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Services/rest.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public rest: RestService) { }

  ngOnInit() {
  }

  public registrar(form){
    console.log(form.value);
    

    //TODO: Enviar por rest el form.value y me devuelve true 
    //o false en caso de que se pueda crear con exito el usuario.
  }

}
