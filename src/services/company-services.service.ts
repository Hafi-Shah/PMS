import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyServicesService {

  constructor(private http: HttpClient) { }

  getCompanyCardDetail() {
    // this.http.get()
  }
}
