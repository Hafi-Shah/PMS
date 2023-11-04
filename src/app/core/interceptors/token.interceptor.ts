import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth : AuthService, private toastr : ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();
    if (myToken){
      req = req.clone({
        setHeaders : {Authorization: `Bearer ${myToken}`} //string interpolation in cs6
      });
      console.log('TokenInterceptor - Request:', req);
    }
    return next.handle(req).pipe(catchError((err:any) => {
      if (err instanceof HttpErrorResponse){
        if (err.status === 401){
          this.toastr.warning('Warning : session is expired, login again');
        }
      }
      return throwError(()=> new Error('Some other error occured'));
    }))
  }

}
