import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="cvapp";
  cvs: { name: string; skills: string[] }[] = []; // Liste globale des CV

  addCvData(newCvs: { name: string; skills: string[] }[]) {
    this.cvs = [...newCvs]; // Mettre à jour avec la liste cumulative
  }


}