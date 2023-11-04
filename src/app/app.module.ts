import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AnnouncementModule} from "./layout/announcement/announcement.module";
import { ToastrModule } from 'ngx-toastr';
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import { UpdateCompanyPopupComponent } from './shared/update-company-popup/update-company-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    UpdateCompanyPopupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LayoutModule,
    AuthModule,
    LayoutRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AnnouncementModule,
    ToastrModule.forRoot(),
    MatSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
