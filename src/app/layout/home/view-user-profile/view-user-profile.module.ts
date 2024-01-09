import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewUserProfileComponent} from "./view-user-profile.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ViewUserProfileComponent,
  },
];

@NgModule({
  declarations: [ViewUserProfileComponent],
    imports: [
        CommonModule,
      RouterModule.forChild(routes)
    ]
})
export class ViewUserProfileModule { }
