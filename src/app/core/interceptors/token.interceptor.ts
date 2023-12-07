import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";


@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth : AuthService, private toastr : ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const myToken = this.auth.getToken();
    const encryptedBody = req.body;
    let request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`,
        "Access-Control-Allow-Origin": "*"
      },
      body: encryptedBody
    });
    const data = next.handle(request.clone({body: encryptedBody}));
    return data;
  }

}
