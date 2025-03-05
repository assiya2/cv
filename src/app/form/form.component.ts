import { Component } from '@angular/core';
import { CvDataService } from '../services/cv-data.service';
import { CvHistoryService } from '../services/cv-history.service';  // Importer le service pour l'historique des CV
import{ AuthService } from '../services/register.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  templates = [
    { id: 1, name: 'Modèle 1', image: 'assets/images/template1.jpg' },
    { id: 2, name: 'Modèle 2', image: 'assets/images/template2.webp' },
    { id: 3, name: 'Modèle 3', image: 'assets/images/template3.jpg' },
    { id: 4, name: 'Modèle 4', image: 'assets/images/template4.jpg' }
  ];
  selectedTemplateIndex: number | null = null;

  cvData = {
    name: '',
    email: '',
    phone: '', // Ajout du champ téléphone
    address: '',
    jobTitle: '',
    profil: '', // Ajout du champ adresse
    experience: [{ title: '', company: '', year: '' }],
    education: [{ degree: '', school: '', year: '' }],
    skills: [{ name: '' }],
    projects: [{ title: '', description: '' }],
    interests: [''],
    languages: [{ language: '', level: '' }],
    customSections: [
      { title: 'Section personnalisée 1', content: '' }, // Exemple de données initialisées
    ],
    photo: '' as string,

    photoPosition: 'center',
    fontFamily: 'Arial',
    sideBackgroundColor: '#ccc', // Couleur par défaut
    sectionTitleColor: '#000000',
    backgroundColor: '#ffffff',
    rightSectionBackgroundColor: '#ffffff',
    rightSectionTextColor: '#000000',
    mainSectionBackgroundColor: '#f5f5f5', // Nouvelle propriété pour la couleur de fond principale
    sectionTitleBackgroundColor: '#e0e0e0',
    sectionTitleTextColor: '#ccc'
  };

  constructor(
    private cvDataService: CvDataService,
    private cvHistoryService: CvHistoryService,
    private authService:AuthService // Injecter le service d'historique des CV
  ) {}
  currentUser: any;
  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.cvData.photo = reader.result as string; // Convertir en base64 pour l'affichage
      };
      reader.readAsDataURL(file);
    }
  }
  removeInterest(index: number): void {
    this.cvData.interests.splice(index, 1); // Retirer l'élément à l'index spécifié
  }
  removeExperience(index: number): void {
    this.cvData.experience.splice(index, 1);
  }

  removeEducation(index: number): void {
    this.cvData.education.splice(index, 1);
  }

  removeSkill(index: number): void {
    this.cvData.skills.splice(index, 1);
  }

  removeProject(index: number): void {
    this.cvData.projects.splice(index, 1);
  }

  removeLanguage(index: number): void {
    this.cvData.languages.splice(index, 1);
  }

  removeCustomSection(index: number): void {
    this.cvData.customSections.splice(index, 1);
  }
  deletePhoto(): void {
    this.cvData.photo = ''; // Réinitialise la photo
  }

  changePhotoPosition(position: string): void {
    this.cvData.photoPosition = position;
  }

  addExperience() {
    this.cvData.experience.push({ title: '', company: '', year: '' });
  }

  addEducation() {
    this.cvData.education.push({ degree: '', school: '', year: '' });
  }

  addSkill() {
    this.cvData.skills.push({ name: '' });
  }

  addProject() {
    this.cvData.projects.push({ title: '', description: '' });
  }

  addInterest() {
    this.cvData.interests.push('');  // Ajouter une nouvelle entrée vide
  }

  addLanguage() {
    this.cvData.languages.push({ language: '', level: '' });
  }

  addCustomSection() {
    this.cvData.customSections.push({ title: 'Nouvelle section personnalisée', content: '' });
  }

  selectTemplate(index: number) {
    this.selectedTemplateIndex = index;
  }
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
  onSubmit(): void {
    const currentUser = this.authService.getCurrentUser(); // Obtenez l'utilisateur connecté
    if (!currentUser || !currentUser.id) {
      console.error('Utilisateur non connecté ou ID manquant');
      return;
    }
  
    const userId = currentUser.id; // Utilisez l'ID utilisateur récupéré
    if (this.selectedTemplateIndex === null) {
      console.error('Veuillez sélectionner un modèle.');
      return;
    }
  
    const templateId = this.templates[this.selectedTemplateIndex].id;
  
    // Exemple de fichier fictif pour tester
    const cvFile = new File(["placeholder"], "cv.pdf", { type: "application/pdf" });
  
    this.cvHistoryService.addCv(cvFile, templateId, this.cvData, userId).subscribe({
      next: (response) => console.log('CV ajouté avec succès', response),
      error: (err) => console.error('Erreur lors de l\'ajout du CV', err),
    });
  }
  


  isFormValid(): boolean {
    // Vérification que cvData est bien défini avant de vérifier ses propriétés
    if (!this.cvData) return false;
  
    return (
      !!this.cvData.name &&
      !!this.cvData.email &&
      !!this.cvData.phone &&
      !!this.cvData.address &&
      this.cvData.experience?.every(exp => !!exp.title && !!exp.company && !!exp.year) &&
      this.cvData.education?.every(edu => !!edu.degree && !!edu.school && !!edu.year) &&
      this.cvData.skills?.every(skill => !!skill.name) &&
      this.cvData.projects?.every(project => !!project.title && !!project.description) &&
      this.cvData.languages?.every(lang => !!lang.language && !!lang.level)
    );
  }
  
  
  }

