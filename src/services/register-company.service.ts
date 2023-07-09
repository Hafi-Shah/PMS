import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";
import {ApiPath} from "../app/core/constants/api-url.constant";
import {Observable} from "rxjs";
import {RegisterCompany} from "../app/models/register-company.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {

  constructor(private http: HttpClient) { }
  registerCompany(obj: RegisterCompany):Observable<any>{
    let url: string = (environment.basePath).concat(ApiPath.REGISTER_COMPANY);
     return this.http.post(url, obj);
  }
}
