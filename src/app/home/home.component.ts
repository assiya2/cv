import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateToForm() {
    const isAuth = this.authService.isAuthenticated();
    console.log('Statut d\'authentification dans HomeComponent :', isAuth);
  
    if (isAuth) {
      console.log('Redirection vers /form');
      this.router.navigate(['/form']);
    } else {
      console.warn('Utilisateur non authentifié, redirection vers /login');
      this.router.navigate(['/login']);
    }
  }
  text = ` Créez votre CV en quelques clics et envoyez-le directement aux profils RH.`;
  animatedText = ''; // Texte affiché progressivement
  index = 0; // Indice du caractère actuellement affiché
  typingSpeed = 100; // Vitesse de l'animation (en ms)
  typingInterval: any; // Pour garder une référence à setInterval et pouvoir l'arrêter
  
  ngOnInit(): void {
    this.typeWriter();
  }
 
  // Fonction qui anime le texte progressivement
  typeWriter() {
    if (this.index < this.text.length) {
      this.animatedText += this.text.charAt(this.index); // Ajouter un caractère
      this.index++;
      setTimeout(() => this.typeWriter(), this.typingSpeed); // Appel récursif
    } else {
      // Une fois le texte complètement affiché, redémarrer après une pause
      setTimeout(() => {
        this.resetTypingAnimation();
      }, 2000); // Pause de 2 secondes avant de redémarrer
    }
  }
  
  resetTypingAnimation() {
    this.animatedText = ''; // Réinitialiser le texte affiché
    this.index = 0; // Réinitialiser l'index
    this.typeWriter(); // Relancer l'animation
  }
  

 
  

  // Gestion des clics des boutons
  onRegister(): void {
    console.log('Naviguer vers la page Inscription');
    this.router.navigate(['/register']); // Remplacez avec votre logique de navigation
  }

  onLogin(): void {
    console.log('Naviguer vers la page Connexion'); 
    this.router.navigate(['/login']);// Remplacez avec votre logique de navigation
  }
  
  }

