import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

export class CardData {
  userId: number = 0;
  firstName: string = '';
  lastName: string = '';
  totalExp: number = 0;
  userType: string = '';
  profilePic: string = '';
  coverImg: string = '';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: CardData[] = [];

  filteredString: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  getCardsDetail() {
    this.userService.getUserCards().subscribe((res: CardData[]) => {
      this.cards = res;
      console.log(this.cards);
    })
  }

  onProfileRoute(id: number) {
    debugger
    this.router.navigate(['view-user-profile', id]);
  }

  ngOnInit() {
    this.getCardsDetail();
  }
}
