
export var enViaje = false;
export const monedero = null;
export var bat = 100;





export interface dataStartViaje {
  cliente: viaje_Cliente;
  scooter: viaje_scooter;
}

export interface viaje_Cliente {
  id: number;
}

export interface viaje_scooter {
  id: number;
}

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


export class DTscooterScan{
  id: number;
  numeroserial: string;
  encendido: boolean;
  enuso: boolean;
  bateria: number;
  kmDisponibles: number;
  costoMinuto: number;
  costoBase: number;

  constructor(obj: any) {
    this.id= obj.id;
    this.numeroserial= obj.numeroserial;
    this.encendido= obj.encendido;
    this.enuso= obj.enuso;
    this.bateria= obj.bateria;
    this.kmDisponibles= obj.kmDisponibles;
    this.costoMinuto= obj.costoMinuto;
    this.costoBase= obj.costoBase;
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

export class ClienteViaje {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  saldo: number;
  constructor(obj: any) {
    this.id= obj.id;
    this.nombre= obj.nombre;
    this.apellido= obj.apellido;
    this.email= obj.email;
    this.saldo= obj.saldo;
  }
}

export class DTscooter {
  id: number;
  numeroserial: string;
  encendido: boolean;
  enuso: boolean;
  eliminado: boolean;
  constructor(obj: any) {
    this.id= obj.id;
    this.numeroserial= obj.numeroserial;
    this.encendido= obj.encendido;
    this.enuso= obj.enuso;
    this.eliminado= obj.eliminado;
  }
}


export class DTresumenViaje {
  minutos: number;
  costoMinuto: number;
  costoBase: number;
  costoTotal: number;
  constructor(obj: any) {
    this.minutos= obj.minutos;
    this.costoMinuto= obj.costoMinuto;
    this.costoBase= obj.costoBase;
    this.costoTotal= obj.costoTotal;
  }
}


export class ResponseStartViaje {
  id: number;
  fechainicio: number;
  fechafin: number;
  estado: string;
  minutospermitidossaldo: number;
  factura?: any;
  cliente: ClienteViaje;
  scooter: DTscooter;

  constructor(obj: any) {
    this.id= obj.id;
    this.fechainicio= obj.fechainicio;
    this.fechafin= obj.fechafin;
    this.minutospermitidossaldo= obj.minutospermitidossaldo;
    this.estado= obj.estado;
    this.factura= obj.factura;
    this.cliente = obj["cliente"];
    this.scooter = obj["scooter"];
  }
}