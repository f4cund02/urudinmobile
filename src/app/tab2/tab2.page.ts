import { Component, OnInit, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { RestService } from '../Services/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as models from '../models/models';
import { Storage } from '@ionic/storage';
import { store, restoreView } from '@angular/core/src/render3';
import { DTuser, DTinfoScooter } from '../models/models';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,  AfterViewInit {

  map: mapboxgl.Map;
  style: 'mapbox://style/mapbox/outdoors-v9';
  milat = 0;
  milng = 0;
  scooterinfo: models.DTscooter;
  saldo: number;

  constructor(public barcodeScanner: BarcodeScanner,
              public rest: RestService,
              public geo: Geolocation,
              public storage: Storage) {


  }


  ngOnInit() {

    this.buildmap();
    this.obtenersaldoMonedero();

  }

  obtenersaldoMonedero() {
    this.storage.get('me').then(data => {
      const aux = data as DTuser;
      this.saldo = aux.saldo;

      }, err => {
      console.error('Error al recuperar el saldo de tu monedero', err);

       });
  }

  ngAfterViewInit() {

  }

  volver() {
    const div = document.getElementById('divInfo');
    div.style.display = 'none';
  }

  abrirQR() {
      console.log('Abriendo QR cam');
      this.barcodeScanner.scan().then(barcodeData => {
          console.log('Barcode data', barcodeData);
          console.log(barcodeData.text);
          
          this.rest.scooterGetInfo(+barcodeData.text).subscribe(
            data => {
              const scooter_scan = data as models.DTscooter;
              console.log('Serial number: ' + scooter_scan.numeroserial);
              this.storage.set('tmpscooter', scooter_scan);
              this.scooterinfo = scooter_scan;

            }, err => {
              console.error('No se pudo obtener datos del QR' , err);

          });
          const div = document.getElementById('divInfo');
          div.style.display = '';
          // TODO: MOSTRAR INFO DEL SCOOTER Y ADEMAS EL SALDO DE SU MONEDERO


        }).catch(err => {
          console.log('Error', err);
          console.log('Debes escanearlo desde un celular , o quiza tu smartphone no tiene el plugin de cordova..');
        });
  }



  buildmap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZjRjdW5kMDIiLCJhIjoiY2p2aGNmemMyMDBxbzRhbzNxb3pydWV0eCJ9.wV6Ce8jWiMkdtUF-jKM8Kg';
    const map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-56.16324 , -34.91035],
    zoom: 10
    });

    map.addControl(new mapboxgl.NavigationControl());


    // llamo funcion getGeojson
    this.rest.getGeojson().subscribe(
        data => {
        const datos = data as DTinfoScooter[] ;

        for (let i = 0; i < datos.length; i++) {

            new mapboxgl.Marker()
            .setLngLat([ +datos[i].longitud,
                       +datos[i].latitud ])
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<p>Scooter n°: ' + datos[i].id + '</p> <p>Bateria : ' + datos[i].bateria + '</p>'))
              .addTo(map);

          }


        }, err => {
            console.error('Hubo un error al recuperar los scooters cercanos , ', err);

        }
      );

    // MI UBICACION//
    this.geo.getCurrentPosition().then((resp) => {
        // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
         this.milat = resp.coords.latitude;
         this.milng = resp.coords.longitude;
            // this.restService.enviarLocalizacion(coords);
         new mapboxgl.Marker()
        .setLngLat([ this.milng, this.milat ])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h6> YO </h6>'))
        .addTo(map);
      }).catch((error) => {
            console.log('Error getting location', error);
          });


    





  }

  iniciarViaje() {
    alert("iniciando viaje");
  }
}
