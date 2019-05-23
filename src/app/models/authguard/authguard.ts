import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {

  constructor(
    private auth: AuthService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {    
    return this.auth.isAuthenticated();
  }
}
