import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnnouncementComponent} from "./announcement.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AnnouncementComponent,
  },
];

@NgModule({
  declarations: [
    AnnouncementComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AnnouncementModule { }
