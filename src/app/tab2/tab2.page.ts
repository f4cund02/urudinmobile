import { Component, OnInit, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { RestService } from '../Services/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as models from '../models/models';
import { Storage } from '@ionic/storage';
import { DTinfoScooter } from '../models/models';
import { NavController, ToastController } from '@ionic/angular';
import { DTUser } from '../models/user/dtuser';
import { ParameterService } from '../Services/parameter/parameter.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  map: mapboxgl.Map;
  style: 'mapbox://style/mapbox/outdoors-v9';
  milat = -34.91035;
  milng = -56.16324;
  scooterinfo: models.DTscooter;
  saldo: number;

  constructor(
    public barcodeScanner: BarcodeScanner,
    public rest: RestService,
    public geo: Geolocation,
    public storage: Storage,
    public navctrl: NavController,
    private toastController: ToastController,
    private parameterAPI: ParameterService
  ) { }


  ngOnInit() {
    this.parameterAPI.getByKey("mapbox_access_token").subscribe(data => {
      console.log(data);
      mapboxgl.accessToken = data.valor;
      this.buildMap();
    }
    );

    this.obtenersaldoMonedero();
  }

  ngAfterViewInit() { }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'mapid',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.milng, this.milat],
      trackResize: true,
      zoom: 10
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      }));

    // llamo funcion getGeojson
    this.rest.getGeojson().subscribe(
      data => {
        const datos = data as DTinfoScooter[];
        for (let i = 0; i < datos.length; i++) {
          new mapboxgl.Marker()
            .setLngLat([+datos[i].longitud,
            +datos[i].latitud])
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML('<p>Scooter n°: ' + datos[i].id + '</p> <p>Bateria : ' + datos[i].bateria + '</p>'))
            .addTo(this.map);
        }
      }, err => {
        console.error('Hubo un error al recuperar los scooters cercanos , ', err);
      }
    );

    

    this.map.on('load', (event) => {
      this.map.resize();
    });
  }

  obtenersaldoMonedero() {
    this.storage.get('me').then(data => {
      const aux = data as DTUser;
      this.saldo = aux.saldo;
    }, err => {
      console.error('Error al recuperar el saldo de tu monedero', err);
    });
  }

  volver() {
    const div = document.getElementById('divInfo');
    div.style.display = 'none';
  }

  abrirQR() {
    this.presentToast("Abriendo QR cam...");
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.rest.scooterGetInfo(+barcodeData.text).subscribe(
        data => {
          const scooter_scan = data as models.DTscooter;
          console.log('Serial number: ' + scooter_scan.numeroserial);
          this.storage.set('tmpscooter', scooter_scan);
          this.scooterinfo = scooter_scan;
        }, err => {
          console.error('No se pudo obtener datos del QR', err);

        });
      const div = document.getElementById('divInfo');
      div.style.display = '';
      // TODO: MOSTRAR INFO DEL SCOOTER Y ADEMAS EL SALDO DE SU MONEDERO

    }).catch(err => {
      console.log('Error', err);
      console.log('Debes escanearlo desde un celular , o quiza tu smartphone no tiene el plugin de cordova..');
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
