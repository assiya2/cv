import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'https://cv-api-production.up.railway.app/send-email'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer un email
  sendEmail(emailData: { to: string; subject: string; message: string }): Observable<any> {
    return this.http.post(this.apiUrl, emailData);
  }
}
