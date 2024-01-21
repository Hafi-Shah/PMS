import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../../services/role.service';
import { GetDataByRoleUser } from '../../../models/role-base-data.model';
import {MatDialog} from "@angular/material/dialog";
import {DeleteAccountPopupComponent} from "../../../shared/delete-account-popup/delete-account-popup.component";
import {AuthService} from "../../../../services/auth.service";
import {UpdateUserDialogComponent} from "../../../shared/update-user-dialog/update-user-dialog.component";

@Component({
  selector: 'app-my-user-profile',
  templateUrl: './my-user-profile.component.html',
  styleUrls: ['./my-user-profile.component.css']
})
export class MyUserProfileComponent implements OnInit {
  data: GetDataByRoleUser[] = [];

  activeSection: string | null = null;

  sections = [
    { id: 'me', label: 'Me' },
    { id: 'about', label: 'About' },
    { id: 'bio', label: 'Bio' },
    { id: 'skills', label: 'Skills' },
  ];

  constructor(
    private el: ElementRef,
    private router: Router,
    private routeParam: ActivatedRoute,
    private roleService: RoleService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  getData() {
    this.routeParam.params.subscribe(param => {
      this.roleService.loginByRoleCompany(param['UserId'], param['Role']).subscribe(
        (res: GetDataByRoleUser[]) => {
          if (res.length > 0) {
            this.data = res;
          } else {
            console.error('Empty response received from the API.');
          }
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }

  onDelete(){
    this.dialog.open(DeleteAccountPopupComponent);
  }

  onLogOut(){
    this.authService.onLogout();
  }

  onUpdate(){
    this.dialog.open(UpdateUserDialogComponent, {
      maxWidth: '100%',
      maxHeight: '100%',
      width: '95%',
      height: '90vh',
      panelClass: 'full-screen-dialog'
    })
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
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
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
