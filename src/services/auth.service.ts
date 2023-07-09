import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
//import {LoginModel, LoginResponse} from "../app/models/login.model";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.development";
import {ApiPath} from "../app/core/constants/api-url.constant";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  objRes:any;
  constructor(private http : HttpClient, private router: Router) {}

  onLogin(obj : any): Observable<any>{
    let url : string = (environment.basePath).concat(ApiPath.LOGIN);
    this.objRes = this.http.post(url, obj);
    // this.objRes.subscribe((res:LoginResponse) => {
    //   console.log('Token received from server:', res.token);
    //   this.storeToken(res.token);
    // });
    return this.objRes;
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

  storeToken(tokenValue : string){
    localStorage.setItem('token', tokenValue);
  }

  getToken(){
    const myToken = localStorage.getItem('token');
    console.log('Token value:', myToken);
    return myToken;
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
}
