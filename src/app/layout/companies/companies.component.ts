import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CompanyCardDetailModel } from '../../models/CompanyCardDetail.model';
import {CompanyService} from '../../../services/company.service';
import {Router} from "@angular/router";
import {RoleBaseComponentAccess} from "../../shared/role-base-component-acess";



@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})


export class CompaniesComponent implements OnInit{

  CompanyCards:CompanyCardDetailModel[] = [];

  storedRole : RoleBaseComponentAccess | undefined;
  filteredString: string = '';



constructor(
  private apiCompanyService:CompanyService,
  private router : Router,
) {}




  getCompanyCards(){
    this.apiCompanyService.getCompanyCards().subscribe((res : any)=>{
      console.log(res);
      this.CompanyCards = res;
    })
  }

  
onButtonClick(Id : number){
  debugger
  this.router.navigate(['view-company-profile', Id]);
}

isRoleCompany(){
  return this.storedRole?.isRoleCompanyTrue();
}

  ngOnInit(): void {
    this.getCompanyCards();
}

}
