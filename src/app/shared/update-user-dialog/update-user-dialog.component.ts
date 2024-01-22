import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {SkillsService} from "../../../services/skills.service";
import {UserService} from "../../../services/user.service";
import Compressor from "compressorjs";


export type defaultDbValue = {
  userId: number;
  firstName: string;
  lastName: string;
  city: string;
  password: string;
  userType: any;
  userSkills: any;
  gender: any;
  martialStatus: any;
  dob: any;
  email: string;
  totalExperience: number;
  about: string;
  contactNum: string;
  profilePic: string;
  coverPic: string;
}

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {
  userUpdateForm: FormGroup | any;
  userUpdateFormSubmitted = false;

  userTypeList: any[] = [];
  skillsList: any[] = [];
  genderList: any[] = [];
  maritalStatusList: any[] = [];

  object: any = {};

  userId: number = 0;
  defaultValue: defaultDbValue = {
    userId: 0,
    firstName: '',
    lastName: '',
    city: '',
    password: '',
    userType: null,  // Replace null with the appropriate default value
    userSkills: [],  // Replace null with the appropriate default value
    gender: null,  // Replace null with the appropriate default value
    martialStatus: null,  // Replace null with the appropriate default value
    dob: null,  // Replace null with the appropriate default value
    email: '',
    totalExperience: 0,
    about: '',
    contactNum: '',
    profilePic: '',
    coverPic: ''
  };

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private apiSkillService: SkillsService,
    private apiUserService: UserService
  ) {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
  }

  getUserValueFromDb() {
    this.apiUserService.getUserDetailById(this.userId).subscribe(res => {
      this.defaultValue = res;
      console.log('default user values from DB', this.defaultValue);
    });
  }

  getSkillList() {
    this.apiSkillService.getSkillNames().subscribe((res) => {
      console.log(res);
      this.skillsList = res;
    })
  }

  getUserType() {
    this.apiUserService.getUserTypes().subscribe((res) => {
      this.userTypeList = res;
    })
  }

  getGenderType() {
    this.apiUserService.getGenderType().subscribe((res) => {
      this.genderList = res;
    })
  }

  getMaritalStatus() {
    this.apiUserService.getMaritalStatus().subscribe((res) => {
      this.maritalStatusList = res;
    })
  }

  userUpdateFormValid() {
    this.userUpdateForm = this.builder.group({
      firstName: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern("[a-zA-z].*"),
      ])),
      lastName: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern("[a-zA-z].*"),
      ])),
      email: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[^0-9][\\w.%+-]+@gmail\\.com$")
      ])),

      password: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])),
      yearlyExp: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d{1,2}$/),
      ])),
      about: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(400),
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s().,]*[a-zA-Z0-9\s.]$/),
      ])),
      city: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ])),
      contact: this.builder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(15),
        Validators.pattern("[0-9]*"),
      ])),

      userTypeId: this.builder.control('', Validators.required),
      genderId: this.builder.control('', Validators.required),
      maritalStatusId: this.builder.control('', Validators.required),
      skills: this.builder.control([], Validators.required),
      dob: this.builder.control('', Validators.required),
      profilePic: this.builder.control(''),
      coverImg: this.builder.control(''),
      role: this.builder.control('user', Validators.required)
    });
  }

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.1,
        success: (result: File | Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            this.userUpdateForm.get(fileType).setValue(base64String);
          };
          reader.readAsDataURL(result);
        },
      });
    }
  }

  onSubmit() {
    this.userUpdateFormSubmitted = true;
    if (this.userUpdateForm.valid) {
      this.object = this.userUpdateForm.value;
      const formattedDob = this.datePipe.transform(this.object.dob, 'dd/MM/yyyy');
      const selectedgender = this.genderList.find(g => g.name === this.defaultValue.gender);
      const selectedUserType = this.userTypeList.find(u => u.name === this.defaultValue.userType);
      const selectedStatus = this.maritalStatusList.find(m => m.name === this.defaultValue.martialStatus);
      const selectedSkills = this.skillsList.find(s => s.name === this.defaultValue.userSkills);
      if (selectedgender) {
        this.object.gender = selectedgender.name; // Keep the value in the dropdown
        this.object.gender = selectedgender.id; // Send the key (ID) to the server
      }
      if (selectedUserType) {
        this.object.userType = selectedUserType.name; // Keep the value in the dropdown
        this.object.userType = selectedUserType.id; // Send the key (ID) to the server
      }
      if (selectedStatus) {
        this.object.status = selectedStatus.name; // Keep the value in the dropdown
        this.object.status = selectedStatus.id; // Send the key (ID) to the server
      }
      debugger
      if (selectedSkills) {
        this.object.skills = selectedSkills.name;
        this.object.skills = selectedSkills.id;
        this.object.skills = this.findKeyByValueSkills(this.object.skills);
      }
      console.log('this.object.skills:', this.object.skills);
      debugger
      const requestBody = {
        firstName: this.object.firstName,
        lastName: this.object.lastName,
        email: this.object.email,
        password: this.object.password,
        yearlyExp: this.object.yearlyExp,
        about: this.object.about,
        MaritalStatusId: this.object.status,
        skills: this.findKeyByValueSkills(this.object.skills),
        dob: formattedDob,
        city: this.object.city,
        genderId: this.object.gender,
        userTypeId: this.object.userType,
        contact: this.object.contact,
        profilePic: this.defaultValue.profilePic || this.object.profilePic,
        coverImg: this.defaultValue.coverPic || this.object.coverImg,
        role: this.object.role,
      };
      console.log(requestBody);
      // debugger
      // this.apiUserService.registerUser(this.object).subscribe((res: any) => {
      //   if (res.success) {
      //     console.log('Request Body:', requestBody);
      //     this.toastr.success('User Registered Successfully');
      //   }
      // });

    } else {
      this.toastr.warning('Enter Your Data Correctly First');
    }
  }


  findKeyByValueGender(value: string): number | null {
    const gender = this.genderList.find((c) => c.name === value);
    return gender ? gender.id : null;
  }

  findKeyByValueUserType(value: number | string): number | null {
    const userType = this.userTypeList.find((ct) => ct.name === value);
    return userType ? userType.id : null;
  }

  findKeyByValueStatus(value: number | string): number | null {
    const status = this.maritalStatusList.find((ct) => ct.name === value);
    return status ? status.id : null;
  }

  findKeyByValueSkills(values: string | string[] | number | number[]): number[] | null {
    if (values === null) {
      return null;
    }

    let normalizedValues: string[] = [];

    if (!Array.isArray(values)) {
      normalizedValues = [String(values)];
    } else {
      normalizedValues = values.map((v) => String(v));
    }

    const keys: number[] = [];
    for (const value of normalizedValues) {
      const skill = this.skillsList.find((ct) => ct.name === value);
      if (skill) {
        keys.push(skill.id);
      }
    }

    return keys.length > 0 ? keys : null;
  }


  cancel() {
    this.toastr.show('Update Action Cancelled', '', {timeOut: 1500});
  }

  ngOnInit() {
    this.userUpdateFormValid();
    this.getSkillList();
    this.getUserType();
    this.getMaritalStatus();
    this.getGenderType();
    this.getUserValueFromDb();
    this.userUpdateForm.patchValue({
      skills: this.defaultValue.userSkills || []
    });
  }

}
