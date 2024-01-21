import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AnnouncementModule} from "./layout/companies/my-company-profile/announcement/announcement.module";
import { ToastrModule } from 'ngx-toastr';
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {MatSelectModule} from "@angular/material/select";
import { UpdateCompanyPopupComponent } from './shared/update-company-popup/update-company-popup.component';
import { DeleteAccountPopupComponent } from './shared/delete-account-popup/delete-account-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UpdateUserDialogComponent } from './shared/update-user-dialog/update-user-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    AppComponent,
    UpdateCompanyPopupComponent,
    DeleteAccountPopupComponent,
    UpdateUserDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    AnnouncementModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
