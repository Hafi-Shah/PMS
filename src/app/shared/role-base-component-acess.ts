import {Injectable} from "@angular/core";

@Injectable({
  providedIn : "root",
})
export class RoleBaseComponentAccess {
  private userRole = localStorage.getItem('role');

  constructor() {
  }

  // get storedRole(): string {
  //   return this.userRole !== null ? this.userRole : '';
  // }

  isRoleCompanyTrue() {
    let data = this.userRole;
    if (data === 'company'){
      return true;
    } else if (data === 'user'){
      return false;
    }
    else return  false;
  }

  isRoleUserTrue(){
    let data = this.userRole;
    if (data === 'user'){
      return true;
    } else if (data === 'company'){
      return false;
    }
    else return  false;
  }

}
