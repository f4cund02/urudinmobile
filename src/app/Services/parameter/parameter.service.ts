import { Injectable } from '@angular/core';
import { EndpointManagerService } from '../endpoints/endpoint-manager.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(
    private httpClient: HttpClient,
    private endpoints: EndpointManagerService
  ) { }

  getByKey(key: string): Observable<any> {
    return this.httpClient.get<any>(this.endpoints.getParameterEndpoint() + "/getDTbyname/?name=" + key)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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
    return throwError(errorMessage);
  }

}
