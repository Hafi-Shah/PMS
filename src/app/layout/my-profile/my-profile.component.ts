import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {AuthService} from "../../../services/auth.service";



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService : AuthService) {
    this.isLoggedIn$ = of(this.authService.isLoggedIn());
  }


}
