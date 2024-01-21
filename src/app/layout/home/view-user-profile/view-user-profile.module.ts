import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewUserProfileComponent} from "./view-user-profile.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

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
      FormsModule,
      RouterModule.forChild(routes)
    ]
})
export class ViewUserProfileModule { }
