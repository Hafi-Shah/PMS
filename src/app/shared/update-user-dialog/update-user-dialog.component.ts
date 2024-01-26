import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {SkillsService} from "../../../services/skills.service";
import {UserService} from "../../../services/user.service";
import Compressor from "compressorjs";
import {UpdateService} from "../../../services/update.service";
import {MatDialogRef} from "@angular/material/dialog";


export class DefaultDbValue {
  userId: number = 0;
  firstName: string = '';
  lastName: string = '';
  city: string = '';
  password: string = '';
  userType: any;
  userSkills: any;
  gender: any;
  maritalStatusId: any;
  dob: any;
  email: string = '';
  totalExperience: number = 0;
  about: string = '';
  contactNum: string = '';
  profilePic: string = '';
  coverPic: string = '';
}

export class Object {
  userId: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  yearlyExp: any;
  about: string = '';
  skills: any;
  dob: any
  genderId: any;
  contact: string = '';
  profilePic: string = '';
  coverImg: string = '';
  userTypeId: any = '';
  city: string = '';
  maritalStatusId: number | null = null;
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

  object: Object;

  userId: number = 0;
  defaultValue: DefaultDbValue;

  role: string = 'user';

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private apiSkillService: SkillsService,
    private apiUserService: UserService,
    private apiUpdateService: UpdateService,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>
  ) {

    this.defaultValue = new DefaultDbValue();
    this.object = new  Object();

    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
  }

  getUserValueFromDb() {
    this.apiUserService.getUserDetailById(this.userId).subscribe(res => {
      this.defaultValue = res;
      console.log(this.defaultValue)
    });
  }

  getSkillList() {
    this.apiSkillService.getSkillNames().subscribe((res) => {
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
      console.log(this.maritalStatusList)
    })
  }

  userUpdateFormValid() {
    this.userUpdateForm = this.builder.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern("[a-zA-Z]{3}.*"),
      ])],
      lastName: [this.defaultValue.lastName, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern("[a-zA-z].*"),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[^0-9][\\w.%+-]+@gmail\\.com$")
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])],
      yearlyExp: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^([0-3]\d{0,1}|[4-9])$/),
      ])],
      about: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(400),
        Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s().,]*[a-zA-Z0-9\s.]$/),
      ])],
      city: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ])],
      contact: ['', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(15),
        Validators.pattern("[0-9]*"),
      ])],
      userTypeId: [this.defaultValue.userType, Validators.required],
      genderId: [this.defaultValue.gender, Validators.required],
      maritalStatusId: [this.defaultValue.maritalStatusId, Validators.required],
      skills: [this.defaultValue.userSkills, Validators.required],
      dob: ['', Validators.required],
      profilePic: [''],
      coverImg: [''],
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
      this.object.userId = this.userId;
      this.object.firstName = this.userUpdateForm.get('firstName').value;
      this.object.lastName = this.userUpdateForm.get('lastName').value;
      this.object.email = this.userUpdateForm.get('email').value;
      this.object.password = this.userUpdateForm.get('password').value;
      this.object.yearlyExp = this.userUpdateForm.get('yearlyExp').value;
      this.object.about = this.userUpdateForm.get('about').value;
      this.object.skills = this.userUpdateForm.get('skills').value;
      this.object.dob = this.userUpdateForm.get('dob').value;
      this.object.contact = this.userUpdateForm.get('contact').value;
      this.object.profilePic = this.userUpdateForm.get('profilePic').value || this.defaultValue.profilePic;
      this.object.coverImg = this.userUpdateForm.get('coverImg').value || this.defaultValue.coverPic;
      this.object.city = this.userUpdateForm.get('city').value;

      // Convert skill names to skill IDs
      const newSkills = this.userUpdateForm.get('skills').value;
      const skillIds = newSkills.map((skillId: number) => {
        return skillId;
      });
      console.log('Final skillIds:', skillIds);
      this.object.skills = [...skillIds];


      // Find selected user type
      const userTypeIdControl = this.userUpdateForm.get('userTypeId');
      const selectedUserType = this.userTypeList.find(u => u.id === userTypeIdControl.value);
      this.object.userTypeId = selectedUserType ? selectedUserType.id : this.findKeyByValueUserType(this.defaultValue.userType);

      // Find selected gender
      const genderIdControl = this.userUpdateForm.get('genderId');
      const selectedGender = this.genderList.find(g => g.id === genderIdControl.value);
      this.object.genderId = selectedGender ? selectedGender.id : this.findKeyByValueGender(this.defaultValue.gender);

      // Find selected marital status
      const maritalStatusIdControl = this.userUpdateForm.get('maritalStatusId');
      const selectedStatus = this.maritalStatusList.find(m => m.id === maritalStatusIdControl.value);
      this.object.maritalStatusId = selectedStatus ? selectedStatus.id : this.findKeyByValueStatus(this.defaultValue.maritalStatusId);

      // Perform any additional checks or modifications if needed

      console.log(this.object);
      debugger
      this.apiUpdateService.updateUserData(this.role, this.object).subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          this.toastr.success(`${res.message}`);
          this.dialogRef.close({ success: true });
        }
      });
    } else {
      this.toastr.warning('Provide Suitable Data');
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

    this.userUpdateForm.get('skills').valueChanges.subscribe((newSkills: string[]) => {
      const skillIds = newSkills.map((skillName: string) => {
        const skill = this.skillsList.find((s) => s.name === skillName);
        return skill ? skill.id : null;
      });
      this.object.skills = [...skillIds];
    });
  }




}
