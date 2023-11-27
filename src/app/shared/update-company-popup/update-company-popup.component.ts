  import {Component, OnInit} from '@angular/core';
  import {CompanyTypesModel} from "../../models/company-types.model";
  import {CountriesModel} from "../../models/countries.model";
  import {FormValidation} from "../../validators/form-validation";

  import {CompanyService} from "../../../services/company.service";
  import {CountryService} from "../../../services/country.service";
  import {ToastrService} from "ngx-toastr";

  import {ViewCompanyDetailsModel} from "../../models/view-company-details.model";
  import {UpdateCompanyData} from "../../models/update-model/update-company-data";
  import {UpdateService} from "../../../services/update.service";
  import {Router} from "@angular/router";

  @Component({
    selector: 'app-update-company-popup',
    templateUrl: './update-company-popup.component.html',
    styleUrls: ['./update-company-popup.component.css']
  })
  export class UpdateCompanyPopupComponent implements OnInit{
    companyTypes:CompanyTypesModel[] = [];
    countries:CountriesModel[] = [];
    displayMsg : string = "";
    isAccountUpdated : boolean = false;
    formValidation:FormValidation = new FormValidation();
    updateModel: UpdateCompanyData;
    storedData : ViewCompanyDetailsModel;

    update :any
    country:any;



    constructor(
      private apiCompanyService:CompanyService,
      private apiCountryService:CountryService,
      private apiUpdateCompany:UpdateService,
      private toastr : ToastrService,
      private getCompanyDetailsSerivce : CompanyService,
      private router: Router
    ) {
      this.storedData = new ViewCompanyDetailsModel();
      this.updateModel = new UpdateCompanyData();



    }

    getLoggedInDetail() {
      this.getCompanyDetailsSerivce.getCompanyDetails(this.updateModel.userId).subscribe(res => {
        console.log(res)
        this.storedData = res;
        this.update === true;
        this.country === res.countryName
      });

    }


    updateCompany() {
      debugger;
      this.updateModel.companyName = this.formValidation.name.value;
      this.updateModel.companyEmail = this.formValidation.email.value;
      this.updateModel.companyPassword = this.formValidation.password.value;
      this.updateModel.contactNum = this.formValidation.contactNumber.value;
      this.updateModel.companyDescription = this.formValidation.description.value;
      this.updateModel.companyLocation = this.formValidation.location.value;

      // Get the selected companyType and countryName from storedData
      const selectedCompanyType = this.companyTypes.find(ct => ct.name === this.storedData.companyType);
      const selectedCountry = this.countries.find(c => c.name === this.storedData.countryName);

      // Set the corresponding values in updateModel
      if (selectedCompanyType) {
        this.updateModel.companyType = selectedCompanyType.name; // Keep the value in the dropdown
        this.updateModel.companyType = selectedCompanyType.id; // Send the key (ID) to the server
      }

      if (selectedCountry) {
        this.updateModel.countryName = selectedCountry.name; // Keep the value in the dropdown
        this.updateModel.countryName = selectedCountry.id; // Send the key (ID) to the server
      }
      console.log()
      this.apiUpdateCompany.updateCompanyData(this.updateModel).subscribe(res => {
        console.log(res);

        if (res.isSuccess === true) {
          this.displayMsg = res.message;
          this.isAccountUpdated = true;
          this.toastr.success('Updated Successful');
        } else if (res.AlreadyExist) {
          this.displayMsg = 'Already Exist. Try another Email.';
          this.isAccountUpdated = false;
        } else {
          this.displayMsg = 'Already Exist';
          this.isAccountUpdated = false;
        }
      });
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.updateModel.profilePic = reader.result as string;
      };
      reader.readAsDataURL(file);
    }


    getCompanyTypes(){
      this.apiCompanyService.getCompanyTypes().subscribe((response:any)=>{
        this.companyTypes = response;
      })
    }

    getCountries() {
      this.apiCountryService.getCountries().subscribe((response: any) => {
        this.countries = response;
      });
    }

    findKeyByValueCountry(value: string): number | null {
      const country = this.countries.find((c) => c.name === value);
      return country ? country.id : null;
    }

    findKeyByValueCompanyType(value: number | string): number | null {
      const companyType = this.companyTypes.find((ct) => ct.name === value);
      return companyType ? companyType.id : null;
    }

    isFormInvalid() {
      return this.formValidation.registrationForm.invalid;
    }

    ngOnInit() {
      this.getCompanyTypes();
      this.getCountries();
      this.getLoggedInDetail();
    }
  }
