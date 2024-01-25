import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {RoleBaseComponentAccess} from "../../shared/role-base-component-acess";
import {FeedService} from "../../../services/feed.service";
import {Router} from "@angular/router";


export class FeedData {
  companyId: number = 0;
  companyName: string = '';
  companyType: string = '';
  country: string = '';
  jobDescription: string = '';
  yearOfExp: any = '';
  skills: any[] = [];
  profilePic: string = '';
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  filteredString: string = '';

  data: FeedData[] = [];

  isLoggedIn$: Observable<boolean>;

  constructor(
    private authSerivce: AuthService,
    private feedService: FeedService,
    private router: Router,
    private roleBaseAccess: RoleBaseComponentAccess
  ) {

    this.isLoggedIn$ = of(this.authSerivce.isLoggedIn());
  }

  getFeedData() {
    this.feedService.getFeedData().subscribe(res => {
      this.data = res;
      console.log(this.data);
    })
  }

  detailView(id: number) {
    this.router.navigate(['view-company-profile', id])
  }

  isRoleUserTrue(): boolean {
    return this.roleBaseAccess.isRoleUserTrue();
  }

  ngOnInit() {
    this.getFeedData();
  }

}
