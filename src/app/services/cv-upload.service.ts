import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvUploadService {

  private apiUrl = 'https://cv-api-production.up.railway.app/api/upload'; // URL de l'API pour uploader les CVs

  constructor(private http: HttpClient) {}

  uploadCVs(files: FileList): Observable<any> {
    const formData = new FormData();
    
    // Vérifiez si les fichiers sont bien un tableau ou un FileList
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        formData.append('files', file, file.name);
      });
    } else {
      console.error('Aucun fichier sélectionné');
      throw new Error('Aucun fichier sélectionné');
    }

    return this.http.post(this.apiUrl, formData);
  }
}
