import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CompaniesComponent} from "./companies.component";


const routes: Routes = [
  {
    path: '', component: CompaniesComponent, children:[
      {
        path: 'view-company-profile/:id',
        loadChildren:() => import('./view-company-profile/view-company-profile.module').then(m => m.ViewCompanyProfileModule),
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule]
})
export class CompanyRoutingModule { }
