import { Component, OnInit, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { RestService } from '../Services/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { DTinfoScooter, DTscooter } from '../models/models';
import { NavController, ModalController } from '@ionic/angular';
import { DTUser } from '../models/user/dtuser';
import { ParameterService } from '../Services/parameter/parameter.service';
import { ToastService } from '../Services/toast/toast.service';
import { ModalExample } from './modals/modal';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  map: mapboxgl.Map;
  latCentrado = "";
  lngCentrado = "";
  scooterinfo: DTscooter;
  saldo: number;

  constructor(
    public barcodeScanner: BarcodeScanner,
    public rest: RestService,
    public geo: Geolocation,
    public storage: Storage,
    public navctrl: NavController,
    private toast: ToastService,
    private parameterAPI: ParameterService
  ) { }

  ngOnInit() {
    //ubicacion actual para centrado
    this.latCentrado = this.rest.getLatitudActual();
    this.lngCentrado = this.rest.getLongitudActual();

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
      style: 'mapbox://styles/mapbox/light-v9',
      center: [Number(this.lngCentrado), Number(this.latCentrado)],
      trackResize: true,
      zoom: 14
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    // llamo funcion getGeojson
    this.rest.getScooterCercanosAmiposicionActual().subscribe(
      data => {
        const datos = data as DTinfoScooter[];
        for (let i = 0; i < datos.length; i++) {
          new mapboxgl.Marker()
            .setLngLat([+datos[i].longitud,
            +datos[i].latitud])
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML('<p>Scooter n°: ' + datos[i]["scooter"].numeroserial + '</p> <p>Bateria : ' + datos[i].bateria + '</p>'))
            .addTo(this.map);
        }
      }, err => {
        console.error('Hubo un error al recuperar los scooters cercanos , ', err);
      }
    );
    this.map.on('load',
      (event) => {
        this.map.resize();
      }
    );
  }

  obtenersaldoMonedero() {
    this.storage.get('me').then(
      data => {
        const aux = data as DTUser;
        this.saldo = aux.saldo;
      },
      err => {
        console.error('Error al recuperar el saldo de tu monedero', err);
      }
    );
  }

  volver() {
    const div = document.getElementById('divInfo');
    div.style.display = 'none';
  }

  abrirQR() {
    // TODO: Pasar el UI del pago a un ion-modal
    this.barcodeScanner.scan().then(
      barcodeData => {
        console.log(barcodeData);
        this.rest.scooterGetInfo(+barcodeData.text).subscribe(
          data => {
            console.log(data);
            const scooter_scan = data as DTscooter;
            this.storage.set('tmpscooter', scooter_scan);
            this.scooterinfo = scooter_scan;

            let a : ModalExample;
            a.presentModal();

          }
          , err => {
            console.error('No se pudo obtener datos del QR', err);
          }
        );
        const div = document.getElementById('divInfo');
        div.style.display = '';
        // TODO: MOSTRAR INFO DEL SCOOTER Y ADEMAS EL SALDO DE SU MONEDERO
      }
    ).catch(
      err => {
        console.log(err);
        this.toast.presentToast("Ha ocurrido un error. Revisa que puedas escanear codigos QR.","danger");        
      }
    );
  }

}
