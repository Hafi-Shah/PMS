import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Observable } from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {
  constructor(
              private auth: AuthService,
              private router : Router,
              private toastr : ToastrService
  ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      return true; // Allow loading of the lazy-loaded module
    } else {
      // Redirect to login or any other page
      //this.toastr.error("Please login first");
      this.router.navigate(['home'])
      return false;
    }
  }
}
