import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../../services/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetDataByRoleCompany} from "../../../models/role-base-data.model";
import {MatDialog} from "@angular/material/dialog";
import {UpdateCompanyPopupComponent} from "../../../shared/update-company-popup/update-company-popup.component";
import {DeleteAccountPopupComponent} from "../../../shared/delete-account-popup/delete-account-popup.component";

@Component({
  selector: 'app-my-company-profile',
  templateUrl: './my-company-profile.component.html',
  styleUrls: ['./my-company-profile.component.css']
})
export class MyCompanyProfileComponent implements OnInit {

  storeCompanyDataByRole: GetDataByRoleCompany | undefined;

  constructor(private service: RoleService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router
  ) {
  }


  getDataByRole() {
    this.route.params.subscribe(param => {
      debugger;
      this.service.loginByRoleCompany(param['UserId'], param['Role']).subscribe(res => {
        console.log(res);
        this.storeCompanyDataByRole = res;
      })
    })
  }

  updateDialog() {
    const dialogRef = this.dialog.open(UpdateCompanyPopupComponent, {
      width: '950px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteAccountPopupComponent, {
      width: '500px',
    });
  }

  ngOnInit() {
    this.getDataByRole();
  }

}
