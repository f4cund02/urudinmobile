import { Component, OnInit, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { RestService } from '../Services/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as models from '../models/models';
import { Storage } from '@ionic/storage';
import { store, restoreView } from '@angular/core/src/render3';






@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,  AfterViewInit {

  map: mapboxgl.Map;
  style: 'mapbox://style/mapbox/outdoors-v9';
  lat = -34.886983;
  lng = -56.144963;
  milat = 0;
  milng = 0;
  scooterinfo : models.DTscooter;

  constructor(public barcodeScanner: BarcodeScanner,
              public rest: RestService,
              public geo: Geolocation,
              public storage: Storage) {


  }


  ngOnInit() {
      // TODO:Pedir por rest las coordenadas de los scooters
      const aux = this.storage.get('me');
      console.log(aux);
      this.buildmap();

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
          this.rest.scooterGetInfo(2).subscribe(
            data=>{
              let scooter_scan = data as models.DTscooter;
              console.log("Serial number: "+scooter_scan.numeroserial);
              this.storage.set('tmpscooter',scooter_scan);
              this.scooterinfo = scooter_scan;
              
            },err=>{
              console.error("No se pudo obtener datos del QR" ,err);

          });
          const div = document.getElementById('divInfo');
          div.style.display = '';
          // TODO: MOSTRAR INFO DEL SCOOTER Y ADEMAS EL SALDO DE SU MONEDERO
          

        }).catch(err => {
          const div = document.getElementById('divInfo');
          div.style.display = '';
          
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

     // FIXME: el log siguiente da `undefined`
    console.log('log this map: ' + this.map);



    // MI UBICACION//
    this.geo.getCurrentPosition().then((resp) => {
        // const coords = resp.coords.latitude + ',' + resp.coords.longitude;
         const milat = resp.coords.latitude;
         const milng = resp.coords.longitude;
            // this.restService.enviarLocalizacion(coords);
      }).catch((error) => {
            console.log('Error getting location', error);
          });


    map.on('load', function() {

      map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
      type: 'geojson',
      data: {
      type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
              type: 'Point',
              coordinates: [-77.03238901390978, 38.913188059745586]
              },
              properties: {
              title: '1',
              icon: 'marker'
              }
            },
            {
              type: 'Feature',
              geometry: {
              type: 'Point',
              coordinates: [-77.03238901390978, 38.913188059745586]
              },
              properties: {
              title: '1',
              icon: 'marker'
              }
            }

          , {
        type: 'Feature',
        properties: {title: '2',
        icon: 'marker'},
        geometry: {
          type: 'Point',
          coordinates: [
            -56.15901947021484,
            -34.91591853170241
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '3',
        icon: 'marker'},
        geometry: {
          type: 'Point',
          coordinates: [
            -56.14983558654785,
            -34.917326130709455
          ]
        }
      },
      {
        type: 'Feature',
        properties: {
          title: '4',
          icon: 'marker'
        },
        geometry: {
          type: 'Point',
          coordinates: [
            -56.15901947021484,
            -34.91591853170241
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '5',
        icon: 'marker'},
        geometry: {
          type: 'Point',
          coordinates: [
            -56.14983558654785,
            -34.917326130709455
          ]
        }
      },

      {
        type: 'Feature',
        properties: {title: '6',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.150522232055664,
            -34.919930125235574
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '7',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.1803913116455,
            -34.91232904497807
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '8',
        icon: 'marker'},
        geometry: {
          type: 'Point',
          coordinates: [
            -56.13987922668457,
            -34.90634621832085
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '9',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.14554405212402,
            -34.90268592120046
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '10',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.16236686706543,
            -34.90712049103522
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '11',
        icon: 'marker'},
        geometry: {
          type: 'Point',
          coordinates: [
            -56.169490814208984,
            -34.906979714721125
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '12',
        icon: 'marker'},
        geometry: {
          type: 'Point',
          coordinates: [
            -56.174297332763665,
            -34.90514960067432
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '13',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.179962158203125,
            -34.9045160901548
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '14',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.17155075073242,
            -34.91289211209846
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '15',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.148719787597656,
            -34.911554821381635
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '16',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.15567207336426,
            -34.91908559552266
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '17',
        icon: 'marker'},
        geometry: {
          type: 'Point',
          coordinates: [
            -56.157732009887695,
            -34.90993596663135
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '18',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.13636016845703,
            -34.909513651446716
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '19',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.13842010498047,
            -34.901348464247704
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '20',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.15386962890625,
            -34.90564232769945
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '21',
        icon: 'marker'},
          geometry: {
          type: 'Point',
          coordinates: [
            -56.18588447570801,
            -34.90866901456059
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '22',
        icon: 'marker'},
          geometry: {
          type: 'Point',
          coordinates: [
            -56.18485450744629,
            -34.9125401956008
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '23',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.170520782470696,
            -34.90078531796189
          ]
        }
      },
      {
        type: 'Feature',
        properties: {title: '24',
        icon: 'marker'},
         geometry: {
          type: 'Point',
          coordinates: [
            -56.16159439086914,
            -34.8995182247005
          ]
        }
      },
      ]
      }
      },
      layout: {
      'icon-image': '{icon}-15',
      'text-field': 'Scooter',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top'
      }
      });
      });

  }

}
