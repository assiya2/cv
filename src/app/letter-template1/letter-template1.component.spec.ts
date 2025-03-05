import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterTemplate1Component } from './letter-template1.component';

describe('LetterTemplate1Component', () => {
  let component: LetterTemplate1Component;
  let fixture: ComponentFixture<LetterTemplate1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterTemplate1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LetterTemplate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
