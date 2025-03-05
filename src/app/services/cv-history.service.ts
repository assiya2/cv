import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvHistoryService {
  private apiUrl = 'https://cv-api-production.up.railway.app/api/cv-history';

  constructor(private http: HttpClient) {}

  addCv(cvFile: File, templateIndex: number, cvData: any, userId: string) {
    const formData = new FormData();
    formData.append('cv', cvFile);
    formData.append('templateIndex', templateIndex.toString());
    formData.append('cvData', JSON.stringify(cvData));
    formData.append('userId', userId);

    return this.http.post('/api/cv-history', formData);  // Endpoint backend pour enregistrer le CV
  }

  getUserCvHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
