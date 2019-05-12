import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public http : HttpClient) { }

  apiUrl = 'https://jsonplaceholder.typicode.com';

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  //POST
  addUser() {
    let postdata = new FormData();
    postdata.append('key','value');
    return this.http.post('https://jsonplaceholder.typicode.com/users',postdata);
  }


}
