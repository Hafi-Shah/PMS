import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.development";
import { ApiPath } from "../app/core/constants/api-url.constant";
import { GetDataByRoleCompany } from "../app/models/role-base-data.model";

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(private http: HttpClient) {}

  loginByRole(id: number, role: string): Observable<any> {
    debugger;
    const url: string = environment.basePath + ApiPath.LOGIN_BY_ROLE + `?id=${id}&role=${role}`;
    return this.http.get<any>(url);
  }
}
