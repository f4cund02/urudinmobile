import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointManagerService {
  
  urlbase:String = "https://api.urudin.tk/";

  constructor() { }

  getClientEndpoint(){
    return (this.urlbase + "/cliente");
  }

  getParameterEndpoint(){
    return (this.urlbase + "/parametro");
  }
}
