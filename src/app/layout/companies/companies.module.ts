import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';

const routes: Routes = [
  {
    path: '',
    component: CompaniesComponent,
    // Other child routes within the HomeModule if needed
  },
];

@NgModule({
  declarations: [CompaniesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Import the RouterModule here
  ]
})
export class CompaniesModule { }
