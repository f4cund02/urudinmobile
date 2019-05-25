import { Injectable } from '@angular/core';
import { DTnewuser } from 'src/app/models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EndpointManagerService } from '../endpoints/endpoint-manager.service';
import { DTUser } from 'src/app/models/user/dtuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private endpoints: EndpointManagerService
  ) { }

  register(u: DTnewuser): Observable<any> {
    return this.http.post(this.endpoints.getClientEndpoint(), JSON.stringify(u), {
      headers: {
        'content-type': 'application/json'
      }
    }
    );
  }

  update(u : DTUser){
    
  }
}
