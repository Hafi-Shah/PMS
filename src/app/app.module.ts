import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './modules/home/home.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { FeedComponent } from './modules/feed/feed.component';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompaniesComponent,
    FeedComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
