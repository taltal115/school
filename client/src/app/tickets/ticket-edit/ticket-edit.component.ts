import {Component, OnDestroy, OnInit} from '@angular/core';
import * as TicketActions from "../store/ticket.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromTicket from "../store/ticket.reducers";
import {PagerService} from "../../shared/pager.service";
import {Ticket} from "../ticket.model";
import {TicketsService} from "../tickets.service";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import * as AuthActions from "../../auth/store/auth.actions";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTicket.FeatureState>,
    private ticketsService: TicketsService) { }
  subscription;
  id: string;
  paramsSubscription: any;
  ticket: any;

  teacherName:string
  teacherId:string
  teachersContactPhone:string
  problemsNature:string
  missingEquipments:string
  deviceLocation:string
  damagedDevice:string
  serialNumber:string
  structure:string
  status:string

ngOnInit() {

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['_id']; // (+) converts string 'id' to a number
          this.ticketsService.getTicket(this.id).subscribe(
            (ticket: any) => {
              this.ticket =  ticket;
              this.teacherName = ticket.teacherName;
              this.teacherId = ticket.teacherId;
              this.teachersContactPhone = ticket.teachersContactPhone;
              this.problemsNature = ticket.problemsNature;
              this.missingEquipments = ticket.missingEquipments;
              this.deviceLocation = ticket.deviceLocation;
              this.damagedDevice = ticket.damagedDevice;
              this.serialNumber = ticket.serialNumber;
              this.structure = ticket.structure;
              this.status = ticket.status;
              console.log(this.ticket)
            }
          )
        }
      );

    // this.params = this.route.params.subscribe(params => {
    //   this.subscription = this.ticketsService.getTicket(params._id).subscribe(
    //     (ticket: any) => {
    //       this.ticket =  ticket;
    //       console.log(this.ticket)
    //     }
    //   )
    // });
  }

  back() {
    this.router.navigate(['/tickets'], {relativeTo: this.route})
  }

  edit() {
    this.router.navigate(['/tickets'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    // this.subscription.unsubscribe()
  }

}
