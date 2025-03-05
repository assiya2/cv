import { Component, Input } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-letter-template2',
  templateUrl: './letter-template2.component.html',
  styleUrl: './letter-template2.component.css'
})
export class LetterTemplate2Component {
 @Input() letterData: {
    name: string;
    address: string;
    email: string;
    date: string;
    subject: string;
    destination: string;
    salutation: string;
    mainParagraph: string;
  } = {
    name: '',
    address: '',
    email: '',
    date: '',
    subject: '',
    destination: '',
    salutation: '',
    mainParagraph: ''
  };

  @Input() userStyle: {
    font: string;
    textAlign: string;
    color: string;
    backgroundColor: string;
  } = {
    font: "'Georgia', serif",
    textAlign: 'justify',
    color: '#333333',
    backgroundColor: '#ffffff'
  };
  downloadPDF() {
    // Sélection de l'élément HTML de la lettre
    const element = document.querySelector('.letter-template') as HTMLElement;
  
    // Configuration des options pour html2pdf.js
    const options = {
      filename: 'Lettre.pdf', // Nom du fichier téléchargé
      image: { type: 'jpeg', quality: 0.98 }, // Qualité de l'image
      html2canvas: { scale: 2 }, // Résolution améliorée pour le rendu HTML
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Paramètres du PDF
    };
  
    // Génération et téléchargement du PDF
    html2pdf().from(element).set(options).save();
  }
  
}
