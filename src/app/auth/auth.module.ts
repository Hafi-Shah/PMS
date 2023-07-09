import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRegComponent } from './user-reg/user-reg.component';
import { CompanyRegModule } from './company-reg/company-reg.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
//import {HTTP_INTERCEPTORS} from "@angular/common/http";
//import {TokenInterceptor} from "../core/interceptors/token.interceptor";

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
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptor,
  //   multi: true
  // }],
  exports: [AuthComponent]
})
export class AuthModule { }
