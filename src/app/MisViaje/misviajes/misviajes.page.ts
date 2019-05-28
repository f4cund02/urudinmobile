import { Component, OnInit } from '@angular/core';
import { DTinfoViaje } from "../../models/models";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-misviajes',
  templateUrl: './misviajes.page.html',
  styleUrls: ['./misviajes.page.scss'],
})
export class MisviajesPage implements OnInit {

  viajes: Array<DTinfoViaje> = new Array<DTinfoViaje>();

  constructor(public storage: Storage) { }


  ngOnInit() {
    //TODO: CARGAR VIAJES CON EL ARREGLO DE JSON QUE ME LLEGA POR REST
    
  }

}
