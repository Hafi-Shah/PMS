import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeModule } from './home/home.module';
import { CompaniesModule } from './companies/companies.module';
import { FeedModule } from './feed/feed.module';
import { MyProfileModule } from './my-profile/my-profile.module';




@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    HomeModule,
    CompaniesModule,
    FeedModule,
    MyProfileModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
