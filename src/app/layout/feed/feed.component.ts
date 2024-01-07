import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {RoleBaseComponentAccess} from "../../shared/role-base-component-acess";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  filteredString : string = '';

  isLoggedIn$: Observable<boolean>;
  roleBaseAccess: RoleBaseComponentAccess;

  constructor(
    private authSerivce: AuthService
  ) {
    this.roleBaseAccess = new RoleBaseComponentAccess();
    this.isLoggedIn$ = of(this.authSerivce.isLoggedIn());
  }

}
