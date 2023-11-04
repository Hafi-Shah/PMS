import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


import {AuthGuard} from "../auth/guard/auth.guard";

import {ViewUserProfileComponent} from "./home/view-user-profile/view-user-profile.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'companies', loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule) },
      { path: 'view-company-profile/:id', loadChildren: () => import('../layout/companies/view-company-profile/view-company-profile.module').then(m => m.ViewCompanyProfileModule) } ,
      { path: 'feed', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule) },
      { path: 'myProfile', loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule) },
      { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
      { path: 'my-company-profile/:UserId/:Role', canLoad: [AuthGuard], loadChildren: () => import('./my-company-profile/my-company-profile.module').then(m => m.MyCompanyProfileModule) },
      {path: 'announcement', canLoad: [AuthGuard], loadChildren: ()=> import('./announcement/announcement.module').then(m => m.AnnouncementModule)}

    ]
  },
  {path:'view-user-profile', component:ViewUserProfileComponent}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }
