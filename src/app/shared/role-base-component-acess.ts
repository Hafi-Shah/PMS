import { Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleBaseComponentAccess {
  private userRole: any;

  constructor(private authService: AuthService) {
    this.userRole = localStorage.getItem('role');
    this.authService.roleChange.subscribe((role) => {
      if (role !== null) {
        this.userRole = role;
      }
    });
  }

  isRoleCompanyTrue(): boolean {
    return this.userRole === 'company';
  }

  isRoleUserTrue(): boolean {
    return this.userRole === 'user';
  }
}
