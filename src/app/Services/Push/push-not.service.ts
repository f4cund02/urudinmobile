import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';


@Injectable({
  providedIn: 'root'
})
export class PushNotService {

constructor(private oneSignal : OneSignal) { }

  configuracionInicial(){

    this.oneSignal.startInit('71fe70d6-b9a4-49fd-a4ca-38491795a8b9', '828442426856');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
    // do something when notification is received
    console.log("Notifiacacion Recibida",noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log("Notificacion Abierta",noti);
    });

    this.oneSignal.endInit();
  }
}