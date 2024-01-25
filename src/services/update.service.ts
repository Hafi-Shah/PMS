import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import { environment } from "../environments/environment.development";
import { ApiPath } from "../app/core/constants/api-url.constant";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) {
  }

  updateCompanyData(obj: any): Observable<any> {
    let url: string = (environment.basePath).concat(ApiPath.UPDATE_COMPANY_DATA);
    return this.http.put<any>(url+'?role=company', obj);
  }

  updateUserData(role:string, obj: any): Observable<any> {
    let url: string = (environment.basePath).concat(ApiPath.UPDATE_USER_DATA);
    return this.http.put<any>(url +`?role=${role}`, obj);
  }
}
