import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { ViewCompanyProfileComponent } from './view-company-profile/view-company-profile.component';
import {ViewCompanyProfileModule} from "./view-company-profile/view-company-profile.module";
import {CompanyRoutingModule} from "./companies-routing.module";


@NgModule({
  declarations: [
    CompaniesComponent,
    ViewCompanyProfileComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ViewCompanyProfileModule
  ],
  exports: [CompaniesComponent]
})
export class CompaniesModule { }
