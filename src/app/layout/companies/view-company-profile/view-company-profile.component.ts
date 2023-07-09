import { Component } from '@angular/core';
import {ViewCompanyDetailsModel} from "../../../models/view-company-details.model";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../../../services/company.service";

@Component({
  selector: 'app-view-company-profile',
  templateUrl: './view-company-profile.component.html',
  styleUrls: ['./view-company-profile.component.css']
})


export class ViewCompanyProfileComponent {
  companyDetails : ViewCompanyDetailsModel | undefined;
  constructor(private route : ActivatedRoute, private service : CompanyService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger
      const companyId = this.route.snapshot.params['id'];
      this.service.getCompanyDetails(companyId).subscribe(res =>{
        this.companyDetails = res;
      })
    });
  }
}
