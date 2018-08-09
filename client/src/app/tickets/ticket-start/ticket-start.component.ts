import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromTicket from '../store/ticket.reducers'
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

import * as TicketActions from '../store/ticket.actions'
import * as RecipeActions from "../../recipes/store/recipe.actions";

@Component({
  selector: 'app-ticket-start',
  templateUrl: './ticket-start.component.html',
  styleUrls: ['./ticket-start.component.css']
})
export class TicketStartComponent implements OnInit {
  tickets: Observable<fromTicket.State>;
  serviceCallCount: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTicket.FeatureState>) { }

  ngOnInit() {
    this.store.dispatch(new TicketActions.FetchTickets())

    this.tickets = this.store.select('tickets');
    this.store.select('tickets').subscribe((result) => {
      console.log("tickets : ",result.tickets.length)
      this.serviceCallCount = result.tickets.length;
    });
  }

  onNewTicket() {
    this.router.navigate(['/new'], {relativeTo: this.route});
  }

  onDeleteRow(index, ticket) {
    console.log(ticket)
    this.store.dispatch(new TicketActions.DeleteRow({index: index, ticket: ticket}));
  }

  onEditRow(ticket) {
    console.log(ticket)
  }
}
