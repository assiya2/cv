import { Component } from '@angular/core';
import { AuthService } from '../services/register.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  role = 'candidate';
  message = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = { name: this.username, email: this.email, password: this.password, role: this.role };
    this.authService.register(user).subscribe(
      (response) => {
        this.message = 'Inscription réussie!';
      },
      (error) => {
        console.error('Erreur:', error);
        this.message = error.error?.message || 'Erreur lors de l\'inscription';
      }
    );
  }
}
