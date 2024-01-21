import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {LayoutRoutingModule} from './layout-routing.module';

import {CompaniesModule} from './companies/companies.module';
import {FeedModule} from './feed/feed.module';
import {MyProfileModule} from './my-profile/my-profile.module';
import {ViewCompanyProfileModule} from "./companies/view-company-profile/view-company-profile.module";
import {MyCompanyProfileModule} from "./companies/my-company-profile/my-company-profile.module";
import {ToastrModule} from "ngx-toastr";
import {HomeModule} from "./home/home.module";
import {MatMenuModule} from "@angular/material/menu";
import {NotificationModule} from "./notification/notification.module";


@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CompaniesModule,
    FeedModule,
    HomeModule,
    MyProfileModule,
    NotificationModule,
    ViewCompanyProfileModule,
    MyCompanyProfileModule,
    ToastrModule.forRoot(),
    MatMenuModule,

  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {
}
