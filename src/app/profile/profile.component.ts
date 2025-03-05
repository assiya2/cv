import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/register.service';
import { ProfileService } from '../services/profile-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Contient les données utilisateur
  isEditing = false;
  selectedPhoto: File | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(
      (data) => {
        console.log('Données reçues :', data); // Ajoutez ceci pour debuguer
        this.user = data;
      },
      (err) => {
        console.error('Erreur lors de la récupération du profil:', err);
      }
    );
  }

  editProfile() {
    this.isEditing = true;
  }

  onPhotoSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }

  saveChanges() {
    this.profileService.updateProfile(this.selectedPhoto, this.user.name, this.user.email).subscribe(
      (response) => {
        console.log('Profil mis à jour:', response);
        this.isEditing = false;
      },
      (err) => console.error('Erreur lors de la mise à jour du profil:', err)
    );
  }
}