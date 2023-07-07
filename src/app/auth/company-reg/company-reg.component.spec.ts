import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegComponent } from './company-reg.component';

describe('CompanyRegComponent', () => {
  let component: CompanyRegComponent;
  let fixture: ComponentFixture<CompanyRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyRegComponent]
    });
    fixture = TestBed.createComponent(CompanyRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
