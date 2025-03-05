import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplate4Component } from './cv-template4.component';

describe('CvTemplate4Component', () => {
  let component: CvTemplate4Component;
  let fixture: ComponentFixture<CvTemplate4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvTemplate4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvTemplate4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
