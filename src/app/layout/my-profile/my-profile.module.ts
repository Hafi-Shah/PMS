import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MyProfileComponent } from './my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
    // Other child routes within the Module if needed
  },
];
@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Import the RouterModule here
  ]
})
export class MyProfileModule { }
