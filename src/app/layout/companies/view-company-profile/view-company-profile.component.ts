import {Component, OnInit} from '@angular/core';
import {ViewCompanyDetailsModel} from "../../../models/view-company-details.model";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../../../services/company.service";
import {RoleBaseComponentAccess} from "../../../shared/role-base-component-acess";

@Component({
  selector: 'app-view-company-profile',
  templateUrl: './view-company-profile.component.html',
  styleUrls: ['./view-company-profile.component.css']
})


export class ViewCompanyProfileComponent implements OnInit{
  companyDetails : ViewCompanyDetailsModel | undefined;
  isRoleCompany : RoleBaseComponentAccess | undefined;
  constructor(private route : ActivatedRoute, private service : CompanyService) {}


  isCompanyRole(){
    return this.isRoleCompany?.isRoleCompanyTrue();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const companyId = this.route.snapshot.params['id'];
      this.service.getCompanyDetails(companyId).subscribe(res =>{
        this.companyDetails = res;
      });
    });
  }
}
