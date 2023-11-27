import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyCompanyProfileComponent} from "./my-company-profile.component";
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";


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
    MatDialogModule,
    RouterModule.forChild(routes)

  ]
})
export class MyCompanyProfileModule { }