import { Injectable } from '@angular/core';
import { DTnewuser } from 'src/app/models/models';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EndpointManagerService } from '../endpoints/endpoint-manager.service';
import { DTUser } from 'src/app/models/user/dtuser';
import { catchError, retry } from 'rxjs/operators';

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
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(u: DTUser): Observable<DTUser> {
    return this.http.put<DTUser>(
      this.endpoints.getClientEndpoint(),
      JSON.stringify(u),
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error);
  }
}
