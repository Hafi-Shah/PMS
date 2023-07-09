import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth : AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();
    if (myToken){
      req = req.clone({
        setHeaders : {Authorization: `Bearer ${myToken}`} //string interpolation in cs6
      });
      console.log('TokenInterceptor - Request:', req);
    }
    return next.handle(req);
  }

}
