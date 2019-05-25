import { Component, OnInit } from '@angular/core';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

    user : DTUser = new DTUser();

  constructor(
    private storage : Storage
  ) { }

  ngOnInit() {
    this.storage.get("me").then(
      response => {
        console.log(response);
        this.user = response;
      }
    );    
  }

  update(){
    
  }

}
