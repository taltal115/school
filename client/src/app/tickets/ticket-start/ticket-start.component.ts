import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromTicket from '../store/ticket.reducers'
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';

import * as TicketActions from '../store/ticket.actions'

@Component({
  selector: 'app-ticket-start',
  templateUrl: './ticket-start.component.html',
  styleUrls: ['./ticket-start.component.css']
})
export class TicketStartComponent implements OnInit {
  // tickets: Observable<fromTicket.State>;
  tickets: any[];
  editMode = false;
  serviceCallCount: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTicket.FeatureState>) { }

  ngOnInit() {
    this.store.dispatch(new TicketActions.FetchTickets())

    // this.tickets = this.store.select('tickets');
    this.store.select('tickets').subscribe((result) => {
      console.log("tickets : ",result.tickets.length)
      this.serviceCallCount = result.tickets.length;
      this.tickets = result.tickets;
    });
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
    console.log(ticket)
    console.log(this.tickets[i])
    console.log("index: ",i)
  }

  onEditSaveRow(ticket) {
    console.log(ticket);
    this.editMode = false;
  }

  fillForm(ticket) {
    console.log(ticket)
  }
}
