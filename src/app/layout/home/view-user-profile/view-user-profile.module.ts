import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewUserProfileComponent} from "./view-user-profile.component";
import {RouterLink, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ViewUserProfileComponent,
    // Other child routes within the HomeModule if needed
  },
];

@NgModule({
  declarations: [ViewUserProfileComponent],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class ViewUserProfileModule { }
