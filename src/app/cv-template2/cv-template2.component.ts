import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { CVService } from '../services/cvservice.service';
@Component({
  selector: 'app-cv-template2',
  templateUrl: './cv-template2.component.html',
  styleUrls: ['./cv-template2.component.css']
})

export class CvTemplate2Component {
  @Input() cvData: any;
   selectedTemplateIndex = 0;
   private isDownloaded: boolean = false; // État de téléchargement
 
   constructor(
     @Inject(PLATFORM_ID) private platformId: Object,
     private CVService: CVService
   ) {}
 
   async downloadPDFAndSave(cvElement: HTMLElement): Promise<void> {
     if (isPlatformBrowser(this.platformId)) {
       console.log('Génération du PDF...');
       const { default: html2pdf } = await import('html2pdf.js');
 
       const options = {
         margin: 0,
         filename: 'cv.pdf',
         image: { type: 'jpeg', quality: 0.98 },
         html2canvas: { scale: 2 },
         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
       };
 
       try {
         // Générer le PDF en tant que blob
         const pdfBlob = await html2pdf()
           .from(cvElement)
           .set(options)
           .outputPdf('blob');
 
         console.log('Blob généré:', pdfBlob);
 
         // Téléchargement local
         const link = document.createElement('a');
         link.href = URL.createObjectURL(pdfBlob);
         link.download = 'cv.pdf';
         link.click();
 
         // Libérer l'URL temporaire
         URL.revokeObjectURL(link.href);
 
         // Sauvegarde dans la base de données
         const timestamp = new Date().getTime();
         const file = new File([pdfBlob], `cv_${timestamp}.pdf`, { type: 'application/pdf' });
 
         const formData = new FormData();
         formData.append('cv', file);
         formData.append('userId', this.cvData.userId);
         formData.append('name', this.cvData.name);
         formData.append('email', this.cvData.email);
         formData.append('phone', this.cvData.phone);
         formData.append('address', this.cvData.address);
         formData.append('jobTitle', this.cvData.jobTitle);
         formData.append('profil', this.cvData.profil);
         formData.append('experience', JSON.stringify(this.cvData.experience));
         formData.append('education', JSON.stringify(this.cvData.education));
         formData.append('skills', JSON.stringify(this.cvData.skills));
         formData.append('projects', JSON.stringify(this.cvData.projects));
         formData.append('interests', JSON.stringify(this.cvData.interests));
         formData.append('languages', JSON.stringify(this.cvData.languages));
         formData.append('customSections', JSON.stringify(this.cvData.customSections));
 
         this.CVService.uploadPdf(formData).subscribe(
          (response) => {
            console.log('CV saved successfully:', response);
            alert('CV saved successfully!');
          },
          (error) => {
            console.error('Error saving CV:', error);
            alert('Error saving CV.');
          }
        );
 
         this.isDownloaded = true; // Marquer comme téléchargé
         alert('CV téléchargé avec succès.');
       } catch (error) {
         console.error('Erreur lors de la génération ou du téléchargement du PDF :', error);
         alert('Erreur lors de la génération ou du téléchargement du CV.');
       }
     }
   }
 
   // Méthode pour voir le CV
   previewCV(cvElement: HTMLElement): void {
     const popup = window.open('', '_blank', 'width=800,height=1000');
     if (popup) {
       popup.document.open();
       popup.document.write(`
         <html>
           <head>
             <title>Prévisualisation du CV</title>
             <link rel="stylesheet" href="styles.css">
           </head>
           <body>${cvElement.innerHTML}</body>
         </html>
       `);
       popup.document.close();
     } else {
       alert("Impossible d'ouvrir la prévisualisation.");
     }
   }
 
   // Méthode pour partager le CV
   shareCV(): void {
     if (!this.isDownloaded) {
       alert('Veuillez télécharger votre CV avant de le partager.');
       return;
     }
 
     const shareUrl = `https://votre-site.com/cv/${this.cvData.userId}`;
     navigator.share
       ? navigator.share({
           title: 'Partager mon CV',
           text: `Découvrez mon CV : ${this.cvData.name}`,
           url: shareUrl,
         })
         .then(() => console.log('CV partagé avec succès.'))
         .catch((error) => console.error('Erreur lors du partage :', error))
       : alert('Le partage est uniquement supporté sur des navigateurs compatibles.');
   }
 }
 