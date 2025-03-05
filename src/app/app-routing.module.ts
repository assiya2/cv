import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';  // Le composant d'inscription
import { HomeComponent } from './home/home.component';  // Le composant de la page d'accueil après connexion
import { FormComponent } from './form/form.component';
import { CvPreviewComponent } from './cv-preview/cv-preview.component';
 // import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard'; 
import { CvListComponent } from './cv-list/cv-list.component';
import { LetterComponent } from './letter/letter.component';
import { ListCvComponent } from './list-cv/list-cv.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },  // Route pour la page après connexion
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] }, 
  { path: 'preview', component: CvPreviewComponent  },
  { path: 'profile', component: ProfileComponent },
  { path: 'cv-list', component: CvListComponent },
  { path: 'letter', component:LetterComponent },
  { path: 'cv', component: FormComponent },
  { path: '**', redirectTo: '/cv-list' } ,
  { path: 'list-cv', component: ListCvComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],

  exports: [RouterModule]
})
export class AppRoutingModule {}
