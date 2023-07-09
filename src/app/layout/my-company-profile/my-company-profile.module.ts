import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyCompanyProfileComponent} from "./my-company-profile.component";
import {RouterModule, Routes} from "@angular/router";

const routes : Routes = [
  {path: '', component : MyCompanyProfileComponent}
  ];
@NgModule({
  declarations: [
    MyCompanyProfileComponent
  ],
  exports: [
    MyCompanyProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class MyCompanyProfileModule { }
