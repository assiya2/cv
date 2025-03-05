import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CVService {
  private apiUrl = 'http://localhost:5000/api/users'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  saveCvData(cvData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, cvData);
  }

 
  uploadPdf(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, formData);
  }

  searchCVs(criteria: { skills: string; project: string }): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/search-cvs`, criteria);
  }

  getPdfPaths(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cvs`);
  }

  compareCVs(cvs: any[]): Observable<any> {
    return this.http.post('http://localhost:5000/api/users/compare-cvs', { cvIds: cvs });
  }
  compareWeighted(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/users/compare-weighted', data);
  }
  
  getAllCVs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cvs`); // Récupérer tous les CV
  }
  deleteCV(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  
  
  getCVById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cvs/${id}`); // Récupérer un CV par ID
  }
  // Récupérer le profil utilisateur connecté
  private apiUrl1 = 'https://cv-api-production.up.railway.app/api/users/profile'; // URL de l'API backend

 

  // Récupérer le profil utilisateur connecté
  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl1);
  }

  // Mettre à jour le profil utilisateur
  updateProfile(photo: File | null, name: string, email: string): Observable<any> {
    const formData = new FormData();
    if (photo) formData.append('photo', photo);
    formData.append('name', name);
    formData.append('email', email);

    return this.http.put(`${this.apiUrl1}/update`, formData);
  }
  
}

