
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
interface DTviaje {

}
