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
export class AnnouncementComponent implements OnInit {

  userId: number = 0;
  role: string = '';

  skillsList: SkillsModel[] = [];
  announcementModel: AnnouncementModel;
  loggedInUserData: GetDataByRoleCompany | undefined;


  private isLoggedIn$: Observable<boolean>;


  constructor(
    private apiSkillsService: SkillsService,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private postAnnounceData: CompanyService
  ) {
    this.announcementModel = new AnnouncementModel();
    this.loggedInUserData = new GetDataByRoleCompany();
    this.isLoggedIn$ = of(this.authService.isLoggedIn());

    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    this.role = storedRole || '';

  }

  validData = this.builder.group({
    skills: this.builder.control([], Validators.required),

    year: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern(/^\d{1,2}$/)
    ])),

    description: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.maxLength(400)
    ])),
    enableAutoApply: [undefined]
  })


  getSkillsList() {
    this.apiSkillsService.getSkillNames().subscribe((res: any) => {
      this.skillsList = res;
    })
  }


  onSubmitData() {
    if (this.validData.valid) {
      this.announcementModel.exp = this.validData.value.year!;
      this.announcementModel.skillId = this.validData.value.skills as number[];
      this.announcementModel.jd = this.validData.value.description!;
      this.announcementModel.isAutoApply = this.validData.value.enableAutoApply || false;
      console.log(this.announcementModel);
      this.postAnnounceData.postAnnouncementDetail(this.userId, this.role,this.announcementModel).subscribe(
        (res) => {
          console.log(res);
          if (res.success) {
            this.toastr.success('Job Announced Successfully');
            this.validData.reset();
          } else {
            this.toastr.error('Job announcement failed. Check console for details.');
          }
        },
        (error) => {
          console.error(error);
          this.toastr.error('An error occurred while announcing the job. Check console for details.');
        }
      );
    } else {
      this.toastr.warning('Please fill the required data to make announcement');
    }
  }

  goBack() {
    this.router.navigate(['my-company-profile', this.userId, this.role]);
  }

  ngOnInit() {
    this.getSkillsList();
  }
}
