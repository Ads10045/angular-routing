import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {


  constructor(private authService: AuthService,private tokenStorageService: TokenStorageService, private router: Router) {}

  
  canActivate(): boolean {
    if (!this.tokenStorageService.isLoggedIn()) {
      this.tokenStorageService.signOut();
      return false;
    }
    return true;
  }
  

  
}
