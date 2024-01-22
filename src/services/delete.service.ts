import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";
import {ApiPath} from "../app/core/constants/api-url.constant";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private router: Router
  ) {
  }

  onDelete(userId: number, role: string, password: string): Observable<any> {
    let url = `${environment.basePath}${ApiPath.DELETE}?userId=${userId}&role=${role}&password=${password}`;
    return this.http.post(url, {});
  }


  onPageReload(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.toastr.show('Account Deleted Successfully', '', {timeOut: 1500});
    this.router.navigate(['/home']);
  }
}
