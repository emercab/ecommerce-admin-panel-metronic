import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Devuelve true si el usuario está autenticado y tiene un token válido, o false en caso contrario
    if (!this.authService.user || !this.authService.token) {
      this.authService.logout();
      return false;
    }

    // Significa que el usuario se ha autenticado y tiene un token.
    // Ahora reviso si el token ha expirado.
    let token: string = this.authService.token;
    let expiration: number = JSON.parse( atob( token.split('.')[1] ) ).exp;
    if (Math.floor(new Date().getTime() / 1000) >= expiration) {
      this.authService.logout();
      return false;
    }

    return true;
  }
}
