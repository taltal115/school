import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromTicket from "../../tickets/store/ticket.reducers";
import * as TicketActions from "../../tickets/store/ticket.actions";
import {PagerService} from "../../shared/pager.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: any;
  subscription: any;
  editMode: boolean = false;
  editStatus: boolean = false;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private store: Store<fromTicket.FeatureState>,
    private pagerService: PagerService
  ) {
  }

  ngOnInit() {
    this.subscription = this.usersService.getUsers().subscribe(
      (users:any) => {
        console.log(users);
        users.map((value: any) => {
          value.editMode = false;
        });
        // set items to json response
        this.users = users;

        // initialize to page 1
        this.setPage(1);
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.length, page);

    // get current page of items
    this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onNewUser() {
    this.router.navigate(['signup']);

  }

  onDeleteRow(index, ticket) {
    console.log(ticket);
    this.store.dispatch(new TicketActions.DeleteRow({index: index, ticket: ticket}));
  }

  onEditRow(ticket, i) {
    this.editMode = true;
    ticket.editMode = true;
    console.log(ticket)
    console.log(this.users[i])
    console.log("index: ",i)
  }

  onEditSaveRow(value, ticket) {
    console.log(value);
    console.log(ticket);
    ticket.status = value;
    this.editMode = false;
    ticket.editMode = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
