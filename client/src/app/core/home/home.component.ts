import { Component, OnInit } from '@angular/core';
import {HomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  organisationCount: number;
  userCount: number;
  ticketCount: number;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getOrganisationCount().subscribe((count) => {this.organisationCount = count});
    this.homeService.getTicketsCount().subscribe((count) => {this.ticketCount = count});
    this.homeService.getUsersCount().subscribe((count) => {this.userCount = count});
  }

}
