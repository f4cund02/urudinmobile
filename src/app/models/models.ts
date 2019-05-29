
export var enViaje = false;
export const monedero = null;
export var bat = 100;



export interface DTinformarScooter{
  latitud: string;
  longitud: string;
  bateria: number;
  scooterid: number;
}


 export interface DTpaypalResp {
  client: DTClient;
  response_type: string;
  response: DTResponse;
}

export interface DTResponse {
  id: string;
  state: string;
  create_time: string;
  intent: string;
}

export interface DTClient {
  environment: string;
  product_name: string;
  paypal_sdk_version: string;
  platform: string;
} 

export interface DTinfoScooter {
  [x: string]: any;
  id: number;
  fecha: number;
  latitud: string;
  longitud: string;
  bateria: number;
  scooter: DTscooter;
}
export interface DTfeature {
  type: string;
  geometry: DTGeometry;
  properties: DTProperties;
}

export interface DTProperties {
  title: string;
  icon: string;
}

export interface DTGeometry {
  type: string;
  coordinates: number[];
}


/*Variables dentro de Storage:
1 - me (DTuser actual en la sesion)
2 - tmpscooter (DTscooter del Qr scaneado)

*/
export interface DTscooter {
  id: number;
  numeroserial: string;
  encendido: boolean;
  enuso: boolean;
  eliminado: boolean;
}

export interface DTnewuser {
  nombre: string;
  apellido: string;
  email: string;
}

export interface DTfactura {

}

export class DTnotificacion{
  id: number;
  cabezal: string;
  cuerpo: string;
  estado: string;
  masiva: boolean;

  constructor(obj: any) {
      this.id = obj.id;
      this.cabezal = obj.cabezal;
      this.cuerpo = obj.cuerpo;
      this.estado = obj.estado;
      this.masiva = obj.masiva;
  }
}

export class DTpago{
  id: number;
  fecha: number;
  saldoanterior: number;
  motivo: string;
  monto: number;
  idtransaccion: string;

  constructor(obj: any) {
      this.id = obj.id;
      this.fecha = obj.fecha;
      this.saldoanterior = obj.saldoanterior;
      this.motivo = obj.motivo;
      this.monto = obj.monto;
      this.idtransaccion = obj.idtransaccion;
  }
}

export class  DTinfoviaje{
  id: number;
  fechainicio: number;
  fechafin: number;
  mailCliente: string;
  numeroserial: string;
  minutos: number;
  costoTotal: number;
  estado: string;

  constructor(obj: any) {
    this.id= obj.id;
    this.fechainicio= obj.fechainicio;
    this.fechafin= obj.fechafin;
    this.mailCliente= obj.mailCliente;
    this.numeroserial= obj.numeroserial;
    this.minutos= obj.minutos;
    this.costoTotal= obj.costoTotal;
    this.estado= obj.estado;
  }
}

export class Post {
  dtnotificacion: DTnotificacion[];

  constructor(obj: any) {
      this.dtnotificacion = obj.dtnotificacion;
  }
}