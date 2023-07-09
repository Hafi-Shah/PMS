import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ViewCompanyProfileComponent} from "./view-company-profile.component";




const routes: Routes = [
  {path: '', component: ViewCompanyProfileComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ViewCompanyProfileModule { }
