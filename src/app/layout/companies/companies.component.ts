import { Component } from '@angular/core';
import { CompanyCardDetailModel } from '../../models/CompanyCardDetail.model';
import {CompanyService} from '../../../services/company.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})


export class CompaniesComponent {

  CompanyCards:CompanyCardDetailModel[] = [];
constructor(private apiCompanyService:CompanyService) {
}
  getCompanyCards(){
    this.apiCompanyService.getCompanyCards().subscribe((res : any)=>{
      this.CompanyCards = res;
    })
  }

  ngOnInit(): void {
    this.getCompanyCards();
  }


}
