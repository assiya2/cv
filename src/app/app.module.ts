import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Pour ngModel
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { CvTemplateComponent } from './cv-template/cv-template.component';
import { CvTemplate2Component } from './cv-template2/cv-template2.component';
import { CvPreviewComponent } from './cv-preview/cv-preview.component';
import { CvDataService } from './services/cv-data.service';
import { CvTemplate3Component } from './cv-template3/cv-template3.component';
import { CvTemplate4Component } from './cv-template4/cv-template4.component';
import { ProfileComponent } from './profile/profile.component';

import { CvUploadComponent } from './cv-upload/cv-upload.component';
import { CvListComponent } from './cv-list/cv-list.component';
import { FooterComponent } from './footer/footer.component';
import { LetterComponent } from './letter/letter.component';
import { LetterTemplate1Component } from './letter-template1/letter-template1.component';
import { LetterTemplate2Component } from './letter-template2/letter-template2.component';
import { ListCvComponent } from './list-cv/list-cv.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FormComponent,
    CvTemplateComponent,
    CvTemplate2Component,
    CvPreviewComponent,
    CvTemplate3Component,
    CvTemplate4Component,
    ProfileComponent,
  
    CvUploadComponent,
    CvListComponent,
    FooterComponent,
    LetterComponent,
    LetterTemplate1Component,
    LetterTemplate2Component,
    ListCvComponent,
  

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule ,
    AppRoutingModule,
    ReactiveFormsModule  // Ajout du FormsModule
  ],
  providers: [
    CvDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
