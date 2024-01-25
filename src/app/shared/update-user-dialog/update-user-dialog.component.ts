import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {SkillsService} from "../../../services/skills.service";
import {UserService} from "../../../services/user.service";
import Compressor from "compressorjs";
import {UpdateService} from "../../../services/update.service";
import {MatDialogRef} from "@angular/material/dialog";


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
    private apiUserService: UserService,
    private apiUpdateService: UpdateService,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>
  ) {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
  }

  getUserValueFromDb() {
    this.apiUserService.getUserDetailById(this.userId).subscribe(res => {
      this.defaultValue = res;
      // console.log('default user values from DB', this.defaultValue);
    });
  }

  getSkillList() {
    this.apiSkillService.getSkillNames().subscribe((res) => {
      console.log('total Skills',res);
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
        Validators.maxLength(15),
        Validators.pattern("[a-zA-Z]{3}.*"),
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
        Validators.pattern(/^([0-3]\d{0,1}|[4-9])$/),
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

      // Convert skill names to skill IDs
      const skillIds = this.userUpdateForm.get('skills').value.map((skillName: string) => {
        const skill = this.skillsList.find((s) => s.name === skillName);
        return skill ? skill.id : null;
      });

      const formattedDob = this.datePipe.transform(this.object.dob, 'yyyy-MM-dd');
      const selectedGender = this.genderList.find(g => g.name === this.defaultValue.gender);
      const selectedUserType = this.userTypeList.find(u => u.name === this.defaultValue.userType);
      const selectedStatus = this.maritalStatusList.find(m => m.name === this.defaultValue.martialStatus);

      if (selectedGender) {
        this.object.genderId = selectedGender.id;
      }
      if (selectedUserType) {
        this.object.userTypeId = selectedUserType.id;
      }
      if (selectedStatus) {
        this.object.maritalStatusId = selectedStatus.id;
      }

      let requestBody = {
        userId: this.defaultValue.userId,
        firstName: this.object.firstName,
        lastName: this.object.lastName,
        email: this.object.email,
        password: this.object.password,
        yearlyExp: this.object.yearlyExp,
        about: this.object.about,
        maritalStatusId: this.object.maritalStatusId,
        skills: skillIds,
        dob: formattedDob,
        genderId: this.object.genderId,
        contact: this.object.contact,
        profilePic: this.defaultValue.profilePic ? this.defaultValue.profilePic : this.object.profilePic,
        coverImg: this.defaultValue.coverPic ? this.defaultValue.coverPic : this.object.coverImg,
        userTypeId: this.object.userTypeId,
        role: this.object.role,
        city: this.object.city,
      };
      console.log(requestBody)
      debugger
      this.apiUpdateService.updateUserData(this.object.role, requestBody).subscribe((res: any) => {
        if (res.success) {
          console.log('Request Body:', requestBody);
          this.toastr.success(`${res.message}`);
          this.dialogRef.close({ success: true });
          this.ngOnInit();
        }
      });
    } else {
      this.toastr.warning('Provide Suitable Data');
    }
  }


  onUserTypeChange(event: any) {
    const userType = this.userTypeList.find((type) => type.id === event.value);
    this.userUpdateForm.get('userTypeId')?.setValue(userType ? userType.id : null);
    // Update the defaultValue object as well
    this.defaultValue.userType = userType ? userType.name : null;
  }

  onGenderChange(event: any) {
    const gender = this.genderList.find((g) => g.id === event.value);
    this.userUpdateForm.get('genderId')?.setValue(gender ? gender.id : null);
    this.defaultValue.gender = gender ? gender.name : null;
  }

  onStatusChange(event: any) {
    const status = this.maritalStatusList.find((s) => s.id === event.value);
    this.userUpdateForm.get('maritalStatusId')?.setValue(status ? status.id : null);
    this.defaultValue.martialStatus = status ? status.name : null;
  }

  onSkillsChange(event: any) {
    const selectedSkills = event.value.map((selectedSkill: number) => {
      const skill = this.skillsList.find((s) => s.id === selectedSkill);
      return skill ? skill.name : null;
    });
    this.userUpdateForm.get('skills')?.setValue(selectedSkills);
    this.defaultValue.userSkills = selectedSkills;
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
    if (values === null || values === undefined) {
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
    this.getUserType();
    this.getMaritalStatus();
    this.getGenderType();
    this.getUserValueFromDb();
    this.getSkillList();
    this.apiSkillService.getSkillNames().subscribe((skills) => {
      this.skillsList = skills;
      // Check if the user has selected other skills; if not, set default values
      if (!this.userUpdateForm.get('skills').value || this.userUpdateForm.get('skills').value.length === 0) {
        this.userUpdateForm.get('skills').setValue(this.defaultValue.userSkills ? this.findKeyByValueSkills(this.defaultValue.userSkills) : []);
      }
    });
  }
}
