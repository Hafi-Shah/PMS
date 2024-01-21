import {Component, HostListener, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";

export class UserData {
  userId: number = 0;
  firstName: string = '';
  lastName: string = '';
  userType: string = '';
  userSkills: any;
  gender: string = '';
  martialStatus: string = '';
  dob: string = '';
  city: string = '';
  email: string = '';
  totalExperience: number = 0;
  about: string = '';
  contactNum: string = '';
  profilePic: string = '';
  coverPic: string = '';
}

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {

  data: UserData;

  activeSection: string | null = null;

  sections = [
    {id: 'me', label: 'Me'},
    {id: 'about', label: 'About'},
    {id: 'bio', label: 'Bio'},
    {id: 'skills', label: 'Skills'},
  ];

  constructor(
    private el: ElementRef,
    private router: Router,
    private routeParam: ActivatedRoute,
    private userService: UserService
  ) {
    this.data = new UserData();
  }


  getData() {
    this.routeParam.params.subscribe(params => {
      const userId = this.routeParam.snapshot.params['id'];
      console.log(userId);
      this.userService.getUserDetailById(userId).subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;

    for (const section of this.sections) {
      const sectionElement = this.el.nativeElement.querySelector(`#${section.id}`);
      if (sectionElement) {
        const offsetTop = sectionElement.offsetTop;
        const offsetBottom = offsetTop + sectionElement.clientHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section.id;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    const sectionElement = this.el.nativeElement.querySelector(`#${sectionId}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
      this.activeSection = sectionId;
    }
  }

  onRoute(path: any) {
    this.router.navigate([path]);
  }

  ngOnInit() {
    this.getData();
  }
}
