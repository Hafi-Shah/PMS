import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiPath} from "../app/core/constants/api-url.constant";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: "root"
})
export class FeedService {
  constructor(private http: HttpClient) {
  }

  getFeedData():Observable<any>{
    let url:string = environment.basePath+ApiPath.GET_FEED_DATA;
    return this.http.get(url);
  }
}
