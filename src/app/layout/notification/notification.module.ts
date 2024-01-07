import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "./notification.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent,
  },
];



@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]

})
export class NotificationModule { }
