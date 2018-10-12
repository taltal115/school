import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
import {CurrentUserService} from "../../shared/current-user.service";
import {User} from "../../models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  organisationCount: number;
  userCount: number;
  ticketCount: number;
  user: User;
  orgSubscription: Subscription;
  userSubscription: Subscription;
  tickerSubscription: Subscription;

  constructor(
    private homeService: HomeService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.user = this.currentUserService.currentUser;
    switch(this.user.userRole) {
      case 'super':
        this.orgSubscription = this.homeService.getOrganisationCount().subscribe((count) => {this.organisationCount = count});
        this.tickerSubscription = this.homeService.getTicketsCount().subscribe((count) => {this.ticketCount = count});
        this.userSubscription = this.homeService.getUsersCount().subscribe((count) => {this.userCount = count});
        break;
      case 'technician':
        this.tickerSubscription = this.homeService.getTicketsCount().subscribe((count) => {this.ticketCount = count});
        break;
      case 'admin':
        this.tickerSubscription = this.homeService.getTicketsCount().subscribe((count) => {this.ticketCount = count});
        this.userSubscription = this.homeService.getUsersCount().subscribe((count) => {this.userCount = count});
        break;
    }
  }

  ngOnDestroy() {
    this.orgSubscription ? this.orgSubscription.unsubscribe() : null;
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
    this.tickerSubscription ? this.tickerSubscription.unsubscribe() : null;
  }
}
