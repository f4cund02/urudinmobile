import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalpageComponent } from './modalpage/modalpage.component';
@Component({
  selector: 'modal-example',
  templateUrl: 'modal-example.html',
  styleUrls: ['./modal-example.css']
})
export class ModalExample {
  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalpageComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}