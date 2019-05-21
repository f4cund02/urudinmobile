
export var enViaje = false;
export const monedero = null;

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

export  interface DTuser {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    saldo: number;
}

export interface DTfactura {

}
interface DTviaje {

}
