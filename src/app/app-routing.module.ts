import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LayoutComponent} from "./layout/layout.component";
import {LoginComponent} from "./auth/login/login.component";
import {UserRegComponent} from "./auth/user-reg/user-reg.component";
import {CompanyRegComponent} from "./auth/company-reg/company-reg.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'userReg', component: UserRegComponent},
      {path: 'companyReg', component: CompanyRegComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
