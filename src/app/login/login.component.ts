import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        const user = this.authService.getCurrentUser();
        if (user.role === 'candidate') {
          this.router.navigate(['/preview']);
        } else if (user.role === 'hr') {
          this.router.navigate(['/cv-list']);
        }
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Erreur de connexion.';
      }
    );
  }
}
