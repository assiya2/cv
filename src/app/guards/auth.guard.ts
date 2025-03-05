import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();
    console.log('Vérification d\'authentification dans AuthGuard :', isAuth);
  
    if (isAuth) {
      console.log('Accès autorisé');
      return true;
    } else {
      console.warn('Accès refusé, redirection vers /login');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
