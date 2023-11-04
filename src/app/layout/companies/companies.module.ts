import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { ViewCompanyProfileComponent } from './view-company-profile/view-company-profile.component';
import {ViewCompanyProfileModule} from "./view-company-profile/view-company-profile.module";
import {CompanyRoutingModule} from "./companies-routing.module";
import {FormsModule} from "@angular/forms";
import {FilterPipe} from "../../core/pipes/filter.pipe";
import {LayoutModule} from "../layout.module";
import {MatDialogModule} from "@angular/material/dialog";







@NgModule({
  declarations: [
    CompaniesComponent,
    ViewCompanyProfileComponent,
    FilterPipe


  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ViewCompanyProfileModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [
    CompaniesComponent,
    FilterPipe
  ]
})
export class CompaniesModule { }
