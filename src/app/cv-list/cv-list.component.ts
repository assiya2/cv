import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmailService } from '../services/email.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CVService } from '../services/cvservice.service';
import { Router } from '@angular/router';
import { Directive, HostListener } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Enregistrer les composants nécessaires
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css'],
})
export class CvListComponent implements OnInit {
  pdfPaths: string[] = [];
  loading = true;
  alertMessage: string | null = null; // Pour stocker les messages d'alerte
  alertType: 'success' | 'error' = 'success'; // Type d'alerte ('success' ou 'error')
  showModal: boolean = false;
  @Input()selectedCv: any;  // Le CV sélectionné pour le contact
  message: string = '';  // Le message à envoyer

  constructor(private CVService: CVService, private sanitizer: DomSanitizer, private http: HttpClientModule,private emailService: EmailService) {}
  
  cvs: any[] = [];
  filteredCvs: any[] = [];
  errorMessage = '';
  searchCriteria = {
    skills: '',
    project: '',
  };

  weights = {
    experience: 1,
    skills: 1,
    projects: 1,
  };
  
  openContactModal(cv: any): void {
    console.log('openContactModal called for:', cv);  // Ajoutez ce log
    this.selectedCv = cv;  // Définit le CV sélectionné
    this.showModal = true;  // Affiche la modal
  }

  // Ferme la modal
  closeContactModal(): void {
    console.log('closeContactModal called');  // Ajoutez ce log
    this.showModal = false;
    this.message = '';  // Réinitialiser le message
  }

  // Envoie le message

  sendMessage() {
    const emailData = {
      to: this.selectedCv.email,
      subject: `Message pour ${this.selectedCv.name}`,
      message: this.message,
    };

    // Utilisation du service pour envoyer l'email
    this.emailService.sendEmail(emailData).subscribe({
      next: () => {
        alert('Message envoyé avec succès!');
        this.closeContactModal();
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi:', err);
        
      },
    });
  }

  
  ngOnInit(): void {
    this.CVService.getAllCVs().subscribe(
      (data) => {
        this.cvs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des CV :', error);
      }
    );
    this.CVService.getPdfPaths().subscribe((cvs) => {
      this.cvs = cvs;
    });
  }
  searchCVs(): void {
    this.loading = true;
    this.errorMessage = '';
    this.filteredCvs = [];
  
    const requestPayload = {
      skills: this.searchCriteria.skills,
      project: this.searchCriteria.project,
      weights: this.weights,
    };
  
    console.log('Request Payload:', requestPayload); // Débogage pour afficher ce qui est envoyé
  
    this.CVService.searchCVs(requestPayload).subscribe({
      next: (cvs) => {
        this.filteredCvs = cvs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche des CVs:', err);
        this.showAlert('Erreur lors de la recherche. Veuillez réessayer.', 'error');
        this.loading = false;
      },
    });
  }
  

  // Permet à la RH de définir les poids
  updateWeights(newWeights: { experience: number; skills: number; projects: number }): void {
    this.weights = newWeights;
    this.searchCVs(); // Met à jour les résultats de la recherche après avoir changé les poids
  }

  getSkillsString(cv: any): string {
    return cv.skills?.map((skill: any) => skill.name).join(', ') || 'Aucune compétence';
  }

  getProjectsString(cv: any): string {
    return cv.projects?.map((project: any) => project.title).join(', ') || 'Aucun projet';
  }

  getSafePdfUrl(pdfPath: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
  }

  compareSelectedCVs(): void {
    const selectedCvs = this.filteredCvs.filter(cv => cv.selected);

    if (selectedCvs.length > 1) {
      selectedCvs.forEach(cv => {
        cv.weightedScore =
          (cv.experiencePoints * this.weights.experience) +
          (cv.skillsPoints * this.weights.skills) +
          (cv.projectPoints * this.weights.projects);
      });

      selectedCvs.sort((a, b) => b.weightedScore - a.weightedScore);

      const labels = selectedCvs.map(cv => cv.name);
      const scores = selectedCvs.map(cv => cv.weightedScore);

      this.displayGraph(labels, scores); // Affiche le graphe

      this.showAlert(
        `Le meilleur CV est : ${selectedCvs[0].name} avec un score pondéré de ${selectedCvs[0].weightedScore}`,
        'success'
      );
    } else {
      this.showAlert('Veuillez sélectionner au moins deux CVs à comparer', 'error');
    }
  }

  displayGraph(labels: string[], scores: number[]): void {
    const canvas = document.getElementById('cvComparisonChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas introuvable dans le DOM');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Impossible d’obtenir le contexte 2D du canvas');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Scores des CVs',
          data: scores,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Score' },
          },
        },
      },
    });
  }

  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = null; // Cache l'alerte après 5 secondes
    }, 5000);
  }

  toggleDetails(cv: any): void {
    cv.showDetails = !cv.showDetails;
  }

  viderListe() {
    this.cvs = [];  // Vide la liste en réinitialisant le tableau
  }

  compareWithWeights(): void {
    const selectedCvs = this.filteredCvs.filter(cv => cv.selected);

    if (selectedCvs.length > 1) {
      selectedCvs.forEach(cv => {
        cv.weightedScore =
          (cv.experiencePoints * this.weights.experience) +
          (cv.skillsPoints * this.weights.skills) +
          (cv.projectPoints * this.weights.projects);
      });

      selectedCvs.sort((a, b) => b.weightedScore - a.weightedScore);
      const bestCv = selectedCvs[0];
      this.showAlert(
        `Le meilleur CV est : ${bestCv.name} avec un score pondéré de ${bestCv.weightedScore}`,
        'success'
      );
    } else {
      this.showAlert('Veuillez sélectionner au moins deux CVs à comparer', 'error');
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const target = (event.target as HTMLElement).getAttribute('href');
    if (target && target.startsWith('#')) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        event.preventDefault(); // Empêche la navigation par défaut
      }
    }
  }

  searchCVs2(): void {
    this.loading = true;
    this.CVService.getPdfPaths().subscribe({
      next: (paths) => {
        this.pdfPaths = paths; // Met à jour les chemins des CV
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche des CVs:', err);
        this.showAlert('Erreur lors de la recherche. Veuillez réessayer.', 'error');
        this.loading = false;
      },
    });
  }
 
}
