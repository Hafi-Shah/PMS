import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';
import {ViewCompanyProfileModule} from "../companies/view-company-profile/view-company-profile.module";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // Other child routes within the HomeModule if needed
  },
];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Import the RouterModule here
      ViewCompanyProfileModule

  ]
})
export class HomeModule { }
