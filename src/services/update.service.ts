import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UpdateCompanyData } from "../app/models/update-model/update-company-data";
import { Observable} from "rxjs";
import { environment } from "../environments/environment.development";
import { ApiPath } from "../app/core/constants/api-url.constant";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) {
  }

  updateCompanyData(obj: UpdateCompanyData): Observable<any> {
    let url: string = (environment.basePath).concat(ApiPath.UPDATE_COMPANY_DATA);
    return this.http.put<UpdateCompanyData>(url+'?role=company', obj);
  }
}
