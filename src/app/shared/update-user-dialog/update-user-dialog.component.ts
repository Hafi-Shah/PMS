import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {SkillsService} from "../../../services/skills.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import Compressor from "compressorjs";
import {Body} from "../../auth/user-reg/user-reg.component";
import {GetDataByRoleUser} from "../../models/role-base-data.model";


@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent {
  userRegForm: FormGroup | any;
  userRegFormSubmitted = false;

  userTypeList: any[] = [];
  skillsList: any[] = [];
  genderList: any[] = [];
  maritalStatusList: any[] = [];

  userId: number = 0;

  obj: Body;

  userData: GetDataByRoleUser = new GetDataByRoleUser();

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private apiSkillService: SkillsService,
    private apiUserService: UserService,
    private router: Router,
  ) {
    this.obj = new Body();

    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
  }

  getUserData(){
    this.apiUserService.getUserDetailById(this.userId).subscribe(res=>{
      this.userData = res;
    });
  }
  getSkillList() {
    this.apiSkillService.getSkillNames().subscribe((res) => {
      this.skillsList = res;
    });
  }

  getUserType() {
    this.apiUserService.getUserTypes().subscribe((res) => {
      this.userTypeList = res;
    });
  }

  getGenderType() {
    this.apiUserService.getGenderType().subscribe((res) => {
      this.genderList = res;
    });
  }

  getMaritalStatus() {
    this.apiUserService.getMaritalStatus().subscribe((res) => {
      this.maritalStatusList = res;
    });
  }

  userRegFormValid() {
    this.userRegForm = this.builder.group({
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
        Validators.minLength(50),
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
      profilePic: this.builder.control('', Validators.required),
      coverImg: this.builder.control('', Validators.required),
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
            this.userRegForm.get(fileType).setValue(base64String);
          };
          reader.readAsDataURL(result);
        },
      });
    }
  }

  cancel(){
    this.toastr.warning("Update Cancelled", '', {timeOut:1000});
  }

  onSubmit() {
    this.userRegFormSubmitted = true;
    if (this.userRegForm.valid) {
      this.obj = this.userRegForm.value;
      const formattedDob = this.datePipe.transform(this.obj.dob, 'dd/MM/yyyy');
      const requestBody = {
        firstName: this.obj.firstName,
        lastName: this.obj.lastName,
        email: this.obj.email,
        password: this.obj.password,
        yearlyExp: this.obj.yearlyExp,
        about: this.obj.about,
        skills: this.obj.skills,
        dob: formattedDob,
        genderId: this.obj.genderId,
        contact: this.obj.contact,
        profilePic: this.obj.profilePic,
        coverImg: this.obj.coverImg,
        userTypeId: this.obj.userTypeId,
        role: this.obj.role,
        city: this.obj.city,
        maritalStatusId: this.obj.maritalStatusId,
      };
      console.log(this.obj);
      debugger
      this.apiUserService.registerUser(this.obj).subscribe((res: any) => {
        if (res) {
          console.log('Request Body:', requestBody);
          this.toastr.success('User Registered Successfully');
          this.router.navigate(['auth/login']);
          this.userRegForm.reset();
        }
      });
    } else {
      this.toastr.warning('Enter Your Data Correctly First');
    }
  }

  ngOnInit() {
    this.userRegFormValid();
    this.getSkillList();
    this.getUserType();
    this.getMaritalStatus();
    this.getGenderType();
  }
}
