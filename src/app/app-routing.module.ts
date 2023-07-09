import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

import { UserRegComponent } from './auth/user-reg/user-reg.component';
import { CompanyRegComponent } from './auth/company-reg/company-reg.component';
import {AnnouncementComponent} from "./layout/announcement/announcement.component";







const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'login', component:  LoginComponent},
      { path: 'userReg', component:  UserRegComponent},
      { path: 'companyReg', component:  CompanyRegComponent}
    ]
  },
  {path: 'announcement', component: AnnouncementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // .../#/crisis-center/
  exports: [RouterModule]
})
export class AppRoutingModule { }
