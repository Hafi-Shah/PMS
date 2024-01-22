import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RoleBaseComponentAccess {
  private userRole = localStorage.getItem('role');

  constructor() {
  }


  isRoleCompanyTrue(): boolean {
    let data = this.userRole;
    if (data === 'company') {
      return true;
    } else {
      return false
    }
  }

  isRoleUserTrue():boolean {
    let data = this.userRole;
    if (data === 'user') {
      return true;
    } else {
      return false
    }
  }

}
