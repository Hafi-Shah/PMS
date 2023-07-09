import { Component } from '@angular/core';
import { CompanyCardDetailModel } from '../../models/CompanyCardDetail.model';
import {CompanyService} from '../../../services/company.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})


export class CompaniesComponent {

  CompanyCards:CompanyCardDetailModel[] = [];
constructor(
  private apiCompanyService:CompanyService,
  private router : Router
) {}
  getCompanyCards(){
    this.apiCompanyService.getCompanyCards().subscribe((res : any)=>{
      this.CompanyCards = res;
    })
  }
onButtonClick(Id : number){
  this.router.navigate(['view-company-profile', Id]);
}
  ngOnInit(): void {
    this.getCompanyCards();
  }

}
