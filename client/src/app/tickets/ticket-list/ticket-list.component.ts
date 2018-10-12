import {Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromTicket from '../store/ticket.reducers'
import {Store} from '@ngrx/store';

import * as TicketActions from '../store/ticket.actions'
import {PagerService} from "../../shared/pager.service";
import {CurrentUserService} from "../../shared/current-user.service";
import {TicketsService} from "../tickets.service";
import {HelperService} from "../../shared/helper.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../models/user";
import {AppConstants} from "../../app.constants";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ticket-start',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // transition('void => *', [
      //   style({
      //     opacity: 0,
      //     transform: 'translateX(-100px)'
      //   }),
      //   animate(300)
      // ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(-100px)',
          opacity: 0
        }))
      ]),
    ])
    ]
})
export class TicketListComponent implements OnInit, OnDestroy {
  // tickets: Observable<fromTicket.State>;
  tickets: any[];
  editMode = false;
  serviceCallCount: number;
  textValue: string;
  statuses = AppConstants.TRANSLATIONS.TICKET_STATUSES;
  subscription;
  inlineStatusEdit: string;
  user: User;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  public searchString: string;
  ticketsState: Observable<fromTicket.State>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTicket.FeatureState>,
    private pagerService: PagerService,
    private currentUserService: CurrentUserService,
    private helperService: HelperService,
    private ticketsService: TicketsService) {
    this.user = this.currentUserService.currentUser;
  }

  ngOnInit() {
    //@TODO: understand why dispatch and select. ho to subscribe to a store?
    this.store.dispatch(new TicketActions.FetchTickets());
    this.ticketsState = this.store.select('tickets');

    // this.subscription = this.store.select('tickets').subscribe((result) => {
    //   console.log("tickets : ",result.tickets.length);
    //   this.serviceCallCount = result.tickets.length;
    //   result.tickets.map((value: any) => {
    //     value.editMode = false;
    //     // value.status = this.inlineStatusEdit = AppConstants.TRANSLATIONS.TICKET_STATUSES[value.status]
    //     this.inlineStatusEdit = value.status
    //     // if(value.status === 'done') value.status = this.inlineStatusEdit =  'הסתים';
    //     // if(value.status === 'waiting_for_approval') value.status = this.inlineStatusEdit = 'ממתין לאישור מנהל';
    //     // if(value.status === 'pending') value.status = this.inlineStatusEdit = 'ממתין לעבודה';
    //   });
    //   // set items to json response
    //   this.tickets = result.tickets;
    //
    //   // initialize to page 1
    //   this.setPage(1);
    // },(error: any) => {
    //   if(typeof error['Errors'] !="undefined"){
    //     console.log(error['Errors']);
    //   }
    // }, () => {
    //   console.log('DONEEE');
    // })
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
    if(confirm('האם אתה בטוח שתרצה למחוק את הכרטיס?')) {
      this.store.dispatch(new TicketActions.DeleteRow({index: index, ticket: ticket}));
    }
  }

  onEditRow(ticket, i) {
    this.editMode = true;
    ticket.editMode = true;
    console.log(ticket)
    console.log(this.tickets[i])
    console.log("index: ",i)
  }

  onEditItem(ticket, i) {
    console.log(ticket)
    this.store.dispatch(new TicketActions.FetchTicket(ticket._id))
    // this.editMode = true;
    // ticket.editMode = true;
    // console.log(this.tickets[i])
    // console.log("index: ",i)
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
    // this.subscription.unsubscribe();
  }

  exportToCsv(){
    this.ticketsService.exportToCsv(this.tickets)
      .subscribe((result: any) => {
        if(result.body) {
          console.log(result);
          this.helperService.downloadFile(result.body);
        }
      }),
      error => {
        console.error(error)
      },
      () => {
        console.log('Done exporting')
      }
  }
}
