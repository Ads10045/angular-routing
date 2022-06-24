import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

import {
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


 const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
//const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private token: TokenStorageService, private authentification: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
   
    if (token != null) {
       authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
   }
    return next.handle(authReq);
  }

}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];