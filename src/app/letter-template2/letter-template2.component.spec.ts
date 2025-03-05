import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterTemplate2Component } from './letter-template2.component';

describe('LetterTemplate2Component', () => {
  let component: LetterTemplate2Component;
  let fixture: ComponentFixture<LetterTemplate2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterTemplate2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LetterTemplate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
