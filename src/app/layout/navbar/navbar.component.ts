import { Component } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Observable, of } from "rxjs";
import { LoginResponse } from "../../models/login.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedInUser: LoginResponse | null = null;
  isLoggedIn$: Observable<boolean>; // Observable to track the login status
  userId: number = 0;
  role: string = '';

  constructor(private service: AuthService, private router: Router) {
    this.isLoggedIn$ = of(this.service.isLoggedIn()); // Assign the Observable value

    // Retrieve userId and role from localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    // Parse userId to a number
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;

    // Set the role
    this.role = storedRole ? storedRole : '';
  }

  assignRole() {
    debugger;
    if (this.role === "user") {
      this.router.navigate(['', this.userId, this.role]);
    } else if (this.role === "company") {
      this.router.navigate(['my-company-profile', this.userId, this.role]);
    } else {
      this.router.navigate(['myProfile']);
    }
  }

  logOut() {
    this.service.onLogout();
  }
}
