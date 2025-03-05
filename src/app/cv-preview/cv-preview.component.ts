import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.css']
})
export class CvPreviewComponent {
  models = [
    { id: 1, name: 'Modèle 1', image: 'assets/images/template1.jpg' },
    { id: 2, name: 'Modèle 2', image: 'assets/images/template3.jpg' },
    { id: 3, name: 'Modèle 3', image: 'assets/images/template4.jpg' }
  ];

  constructor(private router: Router) {}

  // Lorsqu'un modèle est cliqué
  selectModel(model: any) {
    // Redirection vers un formulaire basé sur l'ID ou les données du modèle
    this.router.navigate(['/form', model.id]);
}
}