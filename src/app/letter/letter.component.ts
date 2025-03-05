import { Component } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent {
  templates = [
    { name: 'Modèle 1', image: 'assets/template1.jpg' },
    { name: 'Modèle 2', image: 'assets/template2.jpg' }
  ];

  selectedTemplateIndex: number | null = null;

  letterData = {
    name: '',
    address: '',
    email: '',
    date: '',
    subject: '',
    destination: '',
    salutation: '',
    mainParagraph: ''
  };

  userStyle = {
    font: "'Georgia', serif",
    textAlign: 'justify',
    color: '#333333',
    backgroundColor: '#ffffff'
  };

  selectTemplate(index: number) {
    this.selectedTemplateIndex = index;
  }

  downloadPDFAndSave() {
    console.log('Génération du PDF avec les données :', this.letterData);
  }
}
