import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {AuthGuard} from "../auth/guard/auth.guard";
import {ViewUserProfileComponent} from "./home/view-user-profile/view-user-profile.component";
import {AnnouncementComponent} from "./companies/my-company-profile/announcement/announcement.component";
import {HomeComponent} from "./home/home.component";
import {CompaniesComponent} from "./companies/companies.component";
import {ViewCompanyProfileComponent} from "./companies/view-company-profile/view-company-profile.component";
import {FeedComponent} from "./feed/feed.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {AuthComponent} from "../auth/auth.component";
import {MyCompanyProfileComponent} from "./companies/my-company-profile/my-company-profile.component";
import {NotificationComponent} from "./notification/notification.component";
import {MyUserProfileComponent} from "./my-profile/my-user-profile/my-user-profile.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'home',component: HomeComponent},
      {path: 'companies', component: CompaniesComponent},
      {path: 'view-company-profile/:id', component: ViewCompanyProfileComponent},
      {path: 'feed', component: FeedComponent},
      {path: 'myProfile', component: MyProfileComponent},
      {path: 'auth', component: AuthComponent},
      {path: 'my-company-profile/:UserId/:Role', canLoad: [AuthGuard], component: MyCompanyProfileComponent},
      {path: 'announcement', canLoad: [AuthGuard], component: AnnouncementComponent},
      {path: 'notification', canLoad: [AuthGuard], component: NotificationComponent},
    ]
  },
  {path: 'view-user-profile/:id', component: ViewUserProfileComponent},
  {path: 'my-user-profile/:UserId/:Role', canLoad: [AuthGuard], component: MyUserProfileComponent},
  {path: 'announcement', canLoad: [AuthGuard], component: AnnouncementComponent}
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }
