import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { ApiPath } from '../app/core/constants/api-url.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserTypes(): Observable<any> {
    let url = environment.basePath.concat(ApiPath.GET_USER_TYPES);
    return this.http.get(url);
  }

  getGenderType():Observable<any>{
    let url = environment.basePath.concat(ApiPath.GET_GENDER_TYPES);
    return this.http.get(url);
  }

  getMaritalStatus():Observable<any>{
    let url = environment.basePath.concat(ApiPath.GET_MARITAL_STATUS);
    return this.http.get(url);
  }

  registerUser(body:any):Observable<any>{
    let url: string = environment.basePath.concat(ApiPath.REGISTER_USER);
    return this.http.post(url, body);
  }
}
