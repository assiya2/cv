import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CvDataService {
  private cvData: any = {};
  private selectedTemplate: string = 'template1';

  getCvData() {
    return this.cvData;
  }

  setCvData(data: any) {
    this.cvData = data;
  }

  getTemplate() {
    return this.selectedTemplate;
  }

  setTemplate(template: string) {
    this.selectedTemplate = template;
  }
  
}