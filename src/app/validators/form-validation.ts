import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterCompanyService} from "../../services/register-company.service";


export class FormValidation {
  registrationForm:any;
  // constructor(private RegisterCompanyService: RegisterCompanyService) {
    constructor() {
    this.registrationForm = new FormGroup({

      companyName : new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("[a-zA-z].*")
      ]),

      companyType : new FormControl("",[
        Validators.required
      ]),

      companyDescription : new FormControl("",[
        Validators.required,
        Validators.max(400),
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/),
        ]),

      companyEmail: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[\\w.%+-]+@gmail\\.com$")
      ]),


      companyPassword : new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),

      contactNo : new FormControl("", [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(14),
        Validators.pattern("[0-9]*")
      ]),

      companyLocation : new FormControl("",[
        Validators.required
      ]),
      country : new FormControl("", [
        Validators.required
      ]),
      selectImg : new FormControl("",[
        Validators.required
        ])
    });
  }

  registerSubmited(){
    console.log(this.registrationForm);
  }

  get name() : FormControl{
    return this.registrationForm.get("companyName") as FormControl;
  }
  get type() : FormControl{
    return this.registrationForm.get("companyType") as FormControl;
  }
  get description() : FormControl{
    return this.registrationForm.get("companyDescription") as FormControl;
  }
  get email() : FormControl{
    return this.registrationForm.get("companyEmail") as FormControl;
  }
  get password() : FormControl{
    return this.registrationForm.get("companyPassword") as FormControl;
  }
  get contactNumber() : FormControl{
    return this.registrationForm.get("contactNo") as FormControl;
  }
  get location() : FormControl{
    return this.registrationForm.get("companyLocation") as FormControl;
  }
  get country() : FormControl{
    return this.registrationForm.get("country") as FormControl;
  }
  get profileImg() : FormControl{
    return this.registrationForm.get("selectImg") as FormControl;
  }
}
