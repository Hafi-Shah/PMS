import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { FeedComponent } from './modules/feed/feed.component';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';


const routes: Routes = [
  {path : '' , component: HomeComponent},
  { path: 'home', component: HomeComponent },
  {path: 'companies', component: CompaniesComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'myProfile', component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // .../#/crisis-center/
  exports: [RouterModule]
})
export class AppRoutingModule { }