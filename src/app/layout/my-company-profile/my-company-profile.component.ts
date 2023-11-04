import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../services/role.service";
import {ActivatedRoute} from "@angular/router";
import {GetDataByRoleCompany} from "../../models/role-base-data.model";
import {MatDialog} from "@angular/material/dialog";
import {UpdateCompanyPopupComponent} from "../../shared/update-company-popup/update-company-popup.component";


@Component({
  selector: 'app-my-company-profile',
  templateUrl: './my-company-profile.component.html',
  styleUrls: ['./my-company-profile.component.css']
})
export class MyCompanyProfileComponent implements OnInit{

  storeCompanyDataByRole : GetDataByRoleCompany | undefined;
  //storeUserRole : GetDataByRoleUser = new GetDataByRoleUser();
  constructor(private service: RoleService,
              private route: ActivatedRoute,
              // private dialog: MatDialog
  ) {
  }


  getDataByRole(){
    this.route.params.subscribe(param =>{
      debugger;
      this.service.loginByRoleCompany(param['UserId'], param['Role']).subscribe(res => {
        console.log(res);
        this.storeCompanyDataByRole = res;
      })
    })
  }

  // updatePopup(code : any){
  //   this.openDialog('1000ms', '600ms', code)
  // }

  // openDialog(enteranimation: any, exitanimation: any, code : string){
  //   const popup = this.dialog.open(UpdateCompanyPopupComponent, {
  //     enterAnimationDuration:enteranimation,
  //     exitAnimationDuration: exitanimation,
  //     width: '20%',
  //     data:{
  //       usercode : code
  //     }
  //   });
  //   popup.afterClosed().subscribe(res => {
  //     console.log(res);
  //   })
  // }

ngOnInit() {
    debugger;
  this.getDataByRole();

  }

}
