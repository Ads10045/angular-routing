
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { TokenStorageService } from '../services/token-storage.service';
import { map } from 'rxjs/operators';


//const AUTH_API = 'http://localhost:8080/users/';
const AUTH_API = environment.apiUrl;


/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})

};*/
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  observe: 'response' as 'response'
};

const TOKEN_KEY = 'auth-token';
  const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  

  

  //constructor(private http: HttpClient) { }
 constructor( private http: HttpClient, public token: TokenStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable(); 
}




  login(username: string, password: string): Observable<any> {  
   /* return this.http.post(AUTH_API + 'signin?username=' + username + '&password=' + password, {
      username,
      password
    }, httpOptions);
    */
    

    const tokenResponse =  this.http.post(AUTH_API + 'signin?username=' + username + '&password=' + password, {
      username,
      password
    }, httpOptions);
    
    return tokenResponse;
  }



  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }


  getUserMe(): Observable<any> {
    console.log(AUTH_API+ 'me');
    return this.http.get(AUTH_API + 'me', httpOptions);
  }


 


public get currentUserValue(): User {

  return this.currentUserSubject.value;
}



logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  //this.currentUserSubject.next(null);
  
}

public isLoggedIn(): boolean{
  return localStorage.getItem('currentUser')!== null;
}

}
