import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../../services/role.service';
import { GetDataByRoleUser } from '../../../models/role-base-data.model';
import {MatDialog} from "@angular/material/dialog";
import {DeleteAccountPopupComponent} from "../../../shared/delete-account-popup/delete-account-popup.component";
import {AuthService} from "../../../../services/auth.service";
import {UpdateUserDialogComponent} from "../../../shared/update-user-dialog/update-user-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-my-user-profile',
  templateUrl: './my-user-profile.component.html',
  styleUrls: ['./my-user-profile.component.css']
})
export class MyUserProfileComponent implements OnInit {
  data: GetDataByRoleUser[] = [];

  activeSection: string | null = null;

  onAutoApply: FormGroup | any;

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
    private authService: AuthService,
    private builder: FormBuilder
  ) { }

  getData() {
    this.routeParam.params.subscribe(param => {
      this.roleService.loginByRole(param['UserId'], param['Role']).subscribe(
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
    const dialogRef = this.dialog.open(DeleteAccountPopupComponent)
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });
  }

  onLogOut(){
    this.authService.onLogout();
  }

  onUpdate(){
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      maxWidth: '100%',
      maxHeight: '100%',
      width: '95%',
      height: '90vh',
      panelClass: 'full-screen-dialog'
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.ngOnInit();
    })
  }

  autoApply(){
    this.onAutoApply = this.builder.group({
      autoApply: this.builder.control('')
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

  autoApplyChanges() {
    console.log('Initial value of autoApply:', this.onAutoApply.get('autoApply').value);
    this.onAutoApply.get('autoApply').valueChanges.subscribe((value: any) => {
      console.log('autoApply value changed:', value);
    });
  }

  ngOnInit() {
    this.getData();
    this.autoApply();
    this.autoApplyChanges();
  }
}
