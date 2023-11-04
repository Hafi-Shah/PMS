import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyPopupComponent } from './update-company-popup.component';

describe('UpdateCompanyPopupComponent', () => {
  let component: UpdateCompanyPopupComponent;
  let fixture: ComponentFixture<UpdateCompanyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCompanyPopupComponent]
    });
    fixture = TestBed.createComponent(UpdateCompanyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
