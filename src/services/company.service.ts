import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {ApiPath} from "../app/core/constants/api-url.constant";
import {ViewCompanyDetailsModel} from "../app/models/view-company-details.model";



@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient){}

  getCompanyTypes():Observable<any>{
    let url:string = (environment.basePath).concat(ApiPath.GET_COMPANY_TYPES);
    return this.http.get(url);
  }

  getCompanyCards():Observable<any>{
    let url : string = (environment.basePath).concat(ApiPath.GET_COMPANY_CARDS);
    return this.http.get(url);
  }

  getCompanyDetails(companyId : number):Observable<ViewCompanyDetailsModel>{
    let url : string = (environment.basePath).concat(ApiPath.VIEW_COMPANY_DETAILS).concat(`/${companyId}`);
    return this.http.get<ViewCompanyDetailsModel>(url);
  }


}
