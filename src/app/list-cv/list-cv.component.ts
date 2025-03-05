import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { CVService } from '../services/cvservice.service';
import { Router } from '@angular/router';
import { Directive, HostListener } from '@angular/core';
@Component({
  selector: 'app-list-cv',
  templateUrl: './list-cv.component.html',
  styleUrl: './list-cv.component.css'
})
export class ListCvComponent {
  cvs: any[] = [];

  constructor(private cvService: CVService,private sanitizer: DomSanitizer) {}

 
  ngOnInit(): void {
    this.cvService.getAllCVs().subscribe(
      (data) => {
        this.cvs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des CV :', error);
      }
    );
    this.cvService.getPdfPaths().subscribe((cvs) => {
      this.cvs = cvs;
    });
  }
   
  getSafePdfUrl(pdfPath: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
  }
  
  viewCV(cv: any): void {
    alert(`Affichage du CV de ${cv.name}`);
    // Naviguez vers un autre composant pour afficher les détails si nécessaire
  }
}
