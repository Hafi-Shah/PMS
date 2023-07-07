import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {ApiPath} from "../app/core/constants/api-url.constant";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries():Observable<any>{
    let url: string = (environment.basePath).concat(ApiPath.GET_COUNTRIES);
    return this.http.get(url);
  }
}
