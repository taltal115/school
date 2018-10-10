import { Component, OnInit } from '@angular/core';
import {HomeService} from "./home.service";
import {CurrentUserService} from "../../shared/current-user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  organisationCount: number;
  userCount: number;
  ticketCount: number;
  user: User;

  constructor(
    private homeService: HomeService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.user = this.currentUserService.currentUser;
    this.homeService.getOrganisationCount().subscribe((count) => {this.organisationCount = count});
    this.homeService.getTicketsCount().subscribe((count) => {this.ticketCount = count});
    this.homeService.getUsersCount().subscribe((count) => {this.userCount = count});
  }

}
