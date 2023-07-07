import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRegComponent } from './user-reg/user-reg.component';
import { CompanyRegModule } from './company-reg/company-reg.module';

const routes: Routes = [
  {path: '', component: AuthComponent},
  
];


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    UserRegComponent,
    
  ],
  imports: [
    CommonModule,
    CompanyRegModule,
    RouterModule.forRoot(routes)
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
