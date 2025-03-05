import { Component } from '@angular/core';
import { CvUploadService } from '../services/cv-upload.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cv-upload',
  templateUrl: './cv-upload.component.html',
  styleUrls: ['./cv-upload.component.css']
})
export class CvUploadComponent {

  constructor(private cvUploadService: CvUploadService,
    private http: HttpClient
  ) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post('https://cv-api-production.up.railway.app/api/upload', formData)
        
        .subscribe(response => {
          console.log('Réponse du serveur:', response);
        });
    }
  }
}
