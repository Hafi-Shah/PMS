import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRegComponent } from './company-reg.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {RegisterCompanyService} from "../../../services/register-company.service";

@NgModule({
  declarations: [
    CompanyRegComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports:[
    CompanyRegComponent
  ],
  providers: [RegisterCompanyService]
})
export class CompanyRegModule { }
