import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {ViewUserProfileModule} from "./view-user-profile/view-user-profile.module";
import {FormsModule} from "@angular/forms";
import {CompaniesModule} from "../companies/companies.module";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ViewUserProfileModule,
    RouterModule.forChild(routes),
    FormsModule,
    CompaniesModule


  ]
})
export class HomeModule { }
