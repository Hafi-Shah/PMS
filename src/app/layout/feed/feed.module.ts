import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import {FormsModule} from "@angular/forms";
import {CompaniesModule} from "../companies/companies.module";

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,

  }
];

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    // Import the RouterModule here
  ]
})
export class FeedModule { }
