import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';

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
    RouterModule.forChild(routes), // Import the RouterModule here
  ]
})
export class FeedModule { }
