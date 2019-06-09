import { Component, OnInit, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { RestService } from '../Services/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { DTinfoScooter, DTresumenViaje, DTscooterScan, viaje_scooter, viaje_Cliente, dataStartViaje, ResponseStartViaje } from '../models/models';
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
  scooterinfo: DTscooterScan;
  datosViaje: ResponseStartViaje;
  resumenViaje: DTresumenViaje;
  saldo: number;
  userme: DTUser;
  datosQR:Boolean = false;
  enViaje:Boolean = false;
  viajeFinalizado:Boolean = false;

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

    this.storage.get('me').then(data=>{
       this.userme = data as DTUser;
    }, err => {
      console.error("Se produjo un error al obtener el usuario del storage en tab2.ts", err);
      
    })
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
    this.datosQR = false;
    this.enViaje = false;
    this.viajeFinalizado = false;
    this.ngOnInit();
  }

  finalizarviaje() {
    this.rest.viajeFin(this.datosViaje).subscribe(data=>{
      var response : DTresumenViaje;
      response = data as DTresumenViaje;
      this.resumenViaje = response;
      this.enViaje = false;
      this.viajeFinalizado = true;
      this.toast.presentToast("Viaje finalizado con exito. vea el resumen del viaje","primary");
      console.log("COSTOTOAL:"+this.resumenViaje.costoTotal);
      this.storage.get('me').then(
        data => {
          const aux = data as DTUser;
          this.saldo = aux.saldo - this.resumenViaje.costoTotal;
          this.storage.set('me',aux)   ;
        },
        err => {
          console.error('Error al recuperar el saldo de tu monedero', err);
        }
      );
    },err => {  
        console.error("Hubo un error al comenzar viaje",err);
        
    })

  }

  abrirQR() {
    console.log("ABRO CAMARA ");
    // TODO: Pasar el UI del pago a un ion-modal
    this.barcodeScanner.scan().then(
      barcodeData => {
        console.log(barcodeData.text);
        this.rest.scooterGetInfo(+barcodeData.text).subscribe(
          data => {
            console.log(data);
            const scooter_scan = data as DTscooterScan;
            this.storage.set('tmpscooter', scooter_scan);
            this.scooterinfo = scooter_scan;
            console.log("MUESTRO DATOS");
            this.datosQR = true;
          }
          , err => {
            console.log(err);
            this.toast.presentToast("Ha ocurrido un error al traer los datos del QR.","danger");        
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
        this.toast.presentToast("Ha ocurrido un error. Revisa que puedas escanear codigos QR.","danger");        
      }
    );
  }

  iniciarViaje(){
    var paramData : dataStartViaje;
    var scooterr : viaje_scooter;
    var client: viaje_Cliente;


      scooterr = {
        id: this.scooterinfo.id
      }
      client = {
        id: this.userme.id
      }
      paramData = {
        cliente: client,
        scooter: scooterr
      }

      this.rest.viajeIniciar(paramData).subscribe(data=>{
        var response : ResponseStartViaje;
        response = data as ResponseStartViaje;
        this.toast.presentToast("Comenzando Viaje. #Viaje ["+response.id+"]","primary");
        //'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
        this.datosViaje = response;
        this.enViaje = true;
        //TODO: Agregar listener que cuando cambie la variable "enViaje" a false , se termine el viaje.
        //  usar esto para leer variable.. cada cierto tiempo   }.bind(this), 6000);
        console.log("Datosviaje:" + this.datosViaje);
      },err => {  
          this.toast.presentToast("Ocurrio un Error: " + err["error"].message,"danger");      
      })
   

  }
}
