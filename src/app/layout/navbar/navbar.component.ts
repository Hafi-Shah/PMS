import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { RoleBaseComponentAccess } from "../../shared/role-base-component-acess";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: number = 0;
  role: string = '';

  constructor(
    private service: AuthService,
    private router: Router,
    private access: RoleBaseComponentAccess
  ) {
    this.updateLoggedInStatus();

    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;

    const storedRole = localStorage.getItem('role');
    this.role = storedRole ? storedRole : '';
  }

  private updateLoggedInStatus() {
    this.isLoggedIn = this.service.isLoggedIn();
  }

  assignRole() {
    if (this.role === "user") {
      this.router.navigate(['my-user-profile', this.userId, this.role]);
    } else if (this.role === "company") {
      this.router.navigate(['my-company-profile', this.userId, this.role]);
    } else {
      this.router.navigate(['myProfile']);
    }
  }

  notificationRoute() {
    this.router.navigate(['notification']);
  }

  isRoleCompany(): boolean {
    return this.access.isRoleCompanyTrue();
  }

  isRoleUser(): boolean {
    return this.access.isRoleUserTrue();
  }

  logOut() {
    this.service.onLogout();
  }

  roleAccess() {
    this.isRoleCompany();
    this.isRoleUser();
  }

  ngOnInit() {
    this.roleAccess();
  }
}
