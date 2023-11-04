import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';

import { CompaniesModule } from './companies/companies.module';
import { FeedModule } from './feed/feed.module';
import { MyProfileModule } from './my-profile/my-profile.module';
import {ViewCompanyProfileModule} from "./companies/view-company-profile/view-company-profile.module";
import {MyCompanyProfileModule} from "./companies/my-company-profile/my-company-profile.module";
import {ToastrModule} from "ngx-toastr";









@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    CompaniesModule,
    FeedModule,
    MyProfileModule,
    ViewCompanyProfileModule,
    MyCompanyProfileModule,
    ToastrModule.forRoot(),

  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
