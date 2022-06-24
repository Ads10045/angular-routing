import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';




@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  cookieValue = 'default';


  constructor(private cookieService: CookieService){}
  ngOnInit(): void {
      this.cookieService.set( 'appCookie', 'This is hello apps.' );
  }
  
  
  //set Cookie
  //Syntax - get( name: string ): string;
  getCookie(key: string){
    return this.cookieService.get(key);
  }

  //check Cookie
  //Syntax - check( name: string ): boolean;
  checkCookie(key: string){
    return this.cookieService.check(key);
  }

  //get All Cookie
  //Syntax - getAll(): {};
  getAllCookie(){
    return this.cookieService.getAll();
  }

  //delete cookie
  //Syntax - delete( name: string, path?: string, domain?: string ): void;
  deleteCookie(key: string){
    return this.cookieService.delete(key);
  }

  //delete All cookie
  //Syntax - deleteAll( path?: string, domain?: string ): void;
  deleteAllCookie(){
    return this.cookieService.deleteAll();
  }

}
