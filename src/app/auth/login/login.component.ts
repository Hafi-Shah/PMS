import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {LoginModel, LoginResponse} from "../../models/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginModel : LoginModel;
  apiLoginService : AuthService;

  loginForm = this.builder.group({
    Email: this.builder.control('', Validators.email),
    Password: this.builder.control('', Validators.required)
  });

  constructor(
    private builder : FormBuilder,
    private toastr : ToastrService,
    private authService : AuthService,
    private router : Router
  ) {
    this.userLoginModel = new LoginModel();
    this.userLoginModel.Email = '';
    this.userLoginModel.Password = '';
    this.apiLoginService = authService;
    sessionStorage.clear();
  }

  loginUser() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userLoginModel.Email = this.loginForm.value.Email!;
      this.userLoginModel.Password = this.loginForm.value.Password!;
      this.apiLoginService.onLogin(this.userLoginModel).subscribe(res => {
        console.log(res);
        this.loginForm.reset();
        this.apiLoginService.storeToken(res.token);
        this.toastr.success('Login Successfully');
        this.router.navigate(['/home']);
      },
        error => {
        this.toastr.error("Error occurred while login");
        }
      );
    }
  }

  ngOnInit() {
  this.loginUser();
  }
}
