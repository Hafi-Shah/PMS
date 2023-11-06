import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUserProfileComponent } from './my-user-profile.component';

describe('MyUserProfileComponent', () => {
  let component: MyUserProfileComponent;
  let fixture: ComponentFixture<MyUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyUserProfileComponent]
    });
    fixture = TestBed.createComponent(MyUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
