import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private apiUrl = 'https://example.com/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return headers;
  }

  public get<T>(url: string, params?: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.get<T>(`${this.apiUrl}/${url}`, { headers, params });
  }

  public post<T>(url: string, body: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(`${this.apiUrl}/${url}`, body, { headers });
  }

  public put<T>(url: string, body: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.put<T>(`${this.apiUrl}/${url}`, body, { headers });
  }

  public delete<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.delete<T>(`${this.apiUrl}/${url}`, { headers });
  }
}
