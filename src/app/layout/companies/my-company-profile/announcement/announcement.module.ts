import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnnouncementComponent} from "./announcement.component";
import {RouterModule, Routes} from "@angular/router";
//import {MultiSelectAllModule} from "@syncfusion/ej2-angular-dropdowns";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

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
    RouterModule,
    //MultiSelectAllModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class AnnouncementModule { }
