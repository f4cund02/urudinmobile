import { Component, OnInit } from '@angular/core';
import { DTUser } from 'src/app/models/user/dtuser';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/Services/user/user.service';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

    user : DTUser = new DTUser();

  constructor(
    private storage : Storage,
    private userAPI : UserService,
    private auth : AuthService,
    private toastController : ToastController,
    private navCtrl : NavController
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
    this.userAPI.update(this.user).subscribe(
      result =>{
        console.log(result);
        this.storage.set('me',result);
        this.presentToast('Los datos han sido actualizados.','success');
        location.reload();
        this.navCtrl.navigateBack('/tabs/tab1');
      }, error => {
        this.presentToast('No se han podido actualizar los datos.','danger');
        //mostrar toast
      }
    );
  }

  async presentToast(msg, type) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: type
    });
    toast.present();
  }

}
