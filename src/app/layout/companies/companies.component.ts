import { Component } from '@angular/core';
import { CompanyCardDetail } from './CompanyCardDetail.model';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})


export class CompaniesComponent {

  CompanyCardDetails:CompanyCardDetail[] = [ 
    {
    companyName: "System Ltd",
    companyType: "It Export Company",
    country: "Pakistan"
    },
    {
      companyName: "Aksa",
      companyType: "Software House",
      country: "Pakistan"
      }
  ];



  ngOnInit(): void {
    const newCompanyCardDetail: CompanyCardDetail = {
      companyName: "New Company",
      companyType: "Type",
      country: "Country"
    };
    this.CompanyCardDetails.push(newCompanyCardDetail);
  }
}
