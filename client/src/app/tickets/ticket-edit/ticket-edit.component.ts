import {Component, OnDestroy, OnInit} from '@angular/core';
import * as TicketActions from "../store/ticket.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromTicket from "../store/ticket.reducers";
import {PagerService} from "../../shared/pager.service";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTicket.FeatureState>) { }
  subscription;
  id: string;
  params: any;

  ngOnInit() {
    // this.params = this.route.params.subscribe(params => {
    //
    //   console.log(params);
    //   this.id = params['_id']; // (+) converts string 'id' to a number
    //   this.store.dispatch(new TicketActions.FetchTicket(this.id))
    //   // In a real app: dispatch action to load the details here.
    // });
    // this.store.dispatch(new TicketActions.FetchTicket())
    //
    // this.subscription = this.store.select('tickets').subscribe((result) => {
    //   console.log("tickets : ",result.tickets.length)
    //   this.serviceCallCount = result.tickets.length;
    //   result.tickets.map((value: any) => {
    //     value.editMode = false;
    //   });
    //   // set items to json response
    //   this.tickets = result.tickets;
    //
    //   // initialize to page 1
    //   this.setPage(1);
    // });
  }

  ngOnDestroy() {
    // this.params.unsubscribe()
  }

}
