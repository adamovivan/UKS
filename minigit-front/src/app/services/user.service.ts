import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers:{    
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  constructor(private http: HttpClient) { }


  registerUser(user){
    return this.http.post(SERVER_URL + 'users/addUser', user, {headers: this.headers, responseType: 'text'});
  }

  loginUser(username){
    let user = {"username" : username};
    return this.http.post(SERVER_URL + 'users/login', user, {headers: this.headers, responseType: 'text' } );

  }
}
