import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromTicket from '../store/ticket.reducers'
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';

import * as TicketActions from '../store/ticket.actions'
import {NgForm} from "@angular/forms";
import {PagerService} from "../../shared/pager.service";

@Component({
  selector: 'app-ticket-start',
  templateUrl: './ticket-start.component.html',
  styleUrls: ['./ticket-start.component.css']
})
export class TicketStartComponent implements OnInit, OnDestroy {
  // tickets: Observable<fromTicket.State>;
  tickets: any[];
  editMode = false;
  serviceCallCount: number;
  textValue: string;
  statuses = ['pending', 'done'];
  subscription;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTicket.FeatureState>,
    private pagerService: PagerService) { }

  ngOnInit() {
    const accessToken = JSON.parse(localStorage.getItem('user'));
    console.log(`%c 
user: ${(accessToken).id}
email: ${(accessToken).email}`,'background: green;font-size: 16px;'
    );

    this.store.dispatch(new TicketActions.FetchTickets())

    this.subscription = this.store.select('tickets').subscribe((result) => {
      console.log("tickets : ",result.tickets.length)
      this.serviceCallCount = result.tickets.length;
      result.tickets.map((value: any) => {
        value.editMode = false;
      });
      // set items to json response
      this.tickets = result.tickets;

      // initialize to page 1
      this.setPage(1);
    });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.tickets.length, page);

    // get current page of items
    this.pagedItems = this.tickets.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onNewTicket() {
    // this.router.navigate(['/tickets/new'], {relativeTo: this.route});
    this.router.navigate(['tickets/new']);
  }

  onDeleteRow(index, ticket) {
    console.log(ticket);
    this.store.dispatch(new TicketActions.DeleteRow({index: index, ticket: ticket}));
  }

  onEditRow(ticket, i) {
    this.editMode = true;
    ticket.editMode = true;
    console.log(ticket)
    console.log(this.tickets[i])
    console.log("index: ",i)
  }

  onEditSaveRow(value, ticket) {
    console.log(value);
    console.log(ticket);
    ticket.status = value;
    this.editMode = false;
    ticket.editMode = false;
  }

  fillForm(ticket) {
    console.log(ticket)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
