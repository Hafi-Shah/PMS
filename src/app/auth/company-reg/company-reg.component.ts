import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/services/company.service';
import {CompanyTypesModel} from 'src/app/models/company-types.model'
import { CountriesModel } from 'src/app/models/countries.model';
import { CountryService } from 'src/services/country.service';
import {FormValidation} from "../../validators/form-validation";
import {RegisterCompanyService} from "../../../services/register-company.service";
import {RegisterCompany} from "../../models/register-company.model";


// declare var $: any; // for JQUERY use

@Component({
  selector: 'app-company-reg',
  templateUrl: './company-reg.component.html',
  styleUrls: ['./company-reg.component.css']
})
export class CompanyRegComponent implements OnInit{

  companyTypes:CompanyTypesModel[] = [];
  countries:CountriesModel[] = [];
  displayMsg : string = "";
  isAccountCreated : boolean = false;
  formValidation:FormValidation = new FormValidation();
  registerCompanyModel:RegisterCompany;
  apiRegComp:RegisterCompanyService;

  constructor(
  private apiCompanyService:CompanyService,
  private apiCountryService:CountryService,
  private apiRegisterCompany:RegisterCompanyService
  ) {
    this.registerCompanyModel = new RegisterCompany();
    this.apiRegComp = apiRegisterCompany; //dependency injections
  }



registerCompany(){
  this.registerCompanyModel.companyName = this.formValidation.name.value;
  this.registerCompanyModel.companyTypeId = this.formValidation.type.value;
  this.registerCompanyModel.email = this.formValidation.email.value;
  this.registerCompanyModel.password = this.formValidation.password.value;
  this.registerCompanyModel.contactNum = this.formValidation.contactNumber.value;
  this.registerCompanyModel.description = this.formValidation.description.value;
  this.registerCompanyModel.countryId = this.formValidation.country.value;
  this.registerCompanyModel.location = this.formValidation.location.value;

  this.apiRegComp.registerCompany(this.registerCompanyModel).subscribe(res =>{
    if(res.isSuccess){
      this.displayMsg = res.message;
      this.isAccountCreated = true;
    } else if (res == 'AlreadyExist'){
      this.displayMsg = 'Already Exist. Try another Email.';
      this.isAccountCreated = false;
    } else {
      this.displayMsg = 'Something Went Wrong';
      this.isAccountCreated = false;
    }
    console.log(res);
  });
}

  onFileSelected(event: any) {
    // debugger;
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      // debugger;
      this.registerCompanyModel.profilePic = reader.result as string;
      // Here, you can use the `bytes` array as your byte array representation of the image

    };
    reader.readAsArrayBuffer(file);
  }


 getCompanyTypes(){
    this.apiCompanyService.getCompanyTypes().subscribe((response:any)=>{
    this.companyTypes = response;
  })
 }

  getCountries() {
    this.apiCountryService.getCountries().subscribe((response: any) => {
      this.countries = response; // Assign the response to the 'countries' variable
    });
  }


  ngOnInit() {
    this.getCompanyTypes();
    this.getCountries();
  }
}

