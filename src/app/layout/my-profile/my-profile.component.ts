import { Component } from '@angular/core';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  isUserLoggedIn: boolean = false;

  // loggedInUser() {
  //   this.isUserLoggedIn = true; //use when checked from api/dynamically
  // }
}
