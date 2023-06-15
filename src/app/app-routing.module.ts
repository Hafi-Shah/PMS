import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LayoutModule } from './layout/layout.module';




const routes: Routes = [
  //{path : '' , component: LayoutModule, },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // .../#/crisis-center/
  exports: [RouterModule]
})
export class AppRoutingModule { }