import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [  
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'companies', loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule) },
      { path: 'feed', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule) },
      { path: 'myProfile', loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule) },
      { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }
