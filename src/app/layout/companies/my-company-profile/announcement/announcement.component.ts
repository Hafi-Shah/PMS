import {Component, OnInit} from '@angular/core';
import {SkillsService} from "../../../../../services/skills.service";
import {SkillsModel} from "../../../../models/Skills.model";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AnnouncementModel} from "../../../../models/announcement.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthService} from "../../../../../services/auth.service";
import {GetDataByRoleCompany} from "../../../../models/role-base-data.model";
import {CompanyService} from "../../../../../services/company.service";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit{

  skillsList : SkillsModel[] = [];
  announcementModel : AnnouncementModel;
  loggedInUserData: GetDataByRoleCompany | undefined;


  private isLoggedIn$: Observable<boolean>;
  userId: number = 0;
  role: string = '';


  companyDetail : any;
  constructor(
    private apiSkillsService : SkillsService,
    private builder : FormBuilder,
    private toastr : ToastrService,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
    private getCompanyDetails : CompanyService
  ) {
    this.announcementModel = new AnnouncementModel();
    this.loggedInUserData = new  GetDataByRoleCompany();
    this.isLoggedIn$ = of(this.authService.isLoggedIn());


    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    this.role = storedRole ? storedRole : '';
  }

  validData = this.builder.group({
    skills : this.builder.control('', Validators.required),

      year: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern(/^\d{1,2}$/)
    ])),

    description : this.builder.control('',Validators.compose([
      Validators.required,
      Validators.maxLength(350)
    ])),
    enableAutoApply: [undefined]
  })


  getSkillsList(){
    this.apiSkillsService.getSkillNames().subscribe((res:any) => {
      this.skillsList = res;
    })
  }

  getLoggedInDetail(){
    this.getCompanyDetails.getCompanyDetails(this.userId).subscribe(res => {
      this.companyDetail = res;
      this.companyDetail = {
        companyName: res.companyName,
        companyType: res.companyType,
        country: res.countryName,
        profilePic: res.profilePic
      };
      console.log(this.companyDetail);
    });
  }

  onSubmitData(){
    if (this.validData.valid){
      this.announcementModel.year = this.validData.value.year!;
      this.announcementModel.skills = this.validData.value.skills!;
      this.announcementModel.description = this.validData.value.description!;
      this.announcementModel.autoApply = this.validData.value.enableAutoApply ?? false;
      this.announcementModel.userId = this.userId;
      this.announcementModel.role = this.role;
      this.announcementModel.otherDetails = this.companyDetail;

      console.log(this.announcementModel);
      this.toastr.success('Job Announced Successfully');
    } else {
      this.toastr.warning('Please fill required data to make announcement');
    }
  }

  goBack():void{
    this.router.navigate(['my-company-profile', this.userId, this.role]);
  }

  ngOnInit() {
    this.getSkillsList();
    this.getLoggedInDetail();
  }
}
