import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {switchMap, map, catchError} from 'rxjs/operators';

import * as fromTicket from './ticket.reducers';
import * as AuthActions from './../../auth/store/auth.actions'
import {Store} from '@ngrx/store';
import * as TicketActions from './ticket.actions';
import {TicketsService} from "../tickets.service";
import {take} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {onerror} from "q";
import {of} from "rxjs/index";

@Injectable()
export class TicketEffects {

  user: any;

  // @Effect({dispatch: false})
  @Effect()
  ticketFetch = this.actions$
    .ofType(TicketActions.FETCH_TICKETS)
    .pipe(
      take(1),
      switchMap((action: TicketActions.FetchTickets) => {
      console.log('FETCH_TICKETS: ',action);
      return this.ticketsService.getTickets()
        .pipe(
          map((tickets) => {
            console.log("ticketstickets: ", tickets);
            return {
              type: TicketActions.SET_TICKETS,
              payload: tickets
            };
            // return new SignUpSuccess({token: user.token, email: payload.email});
          }),
          catchError((error: any) => {
            console.log(error);
            this.router.navigate(['/login']);
            localStorage.removeItem('user');
            return of({
              type: AuthActions.LogOut
            })
          })
        );
    })
    );

  @Effect({dispatch: false})
  ticketByIdFetch = this.actions$
    .ofType(TicketActions.FETCH_TICKET)
    .pipe(
      switchMap((action: TicketActions.FetchTicket) => {
      console.log('FETCH_TICKET: ',action);
      return this.ticketsService.getTicket(action.payload)
        .pipe(
          map((ticket) => {
            console.log("ticketstickets132: ", ticket);
            // @ts-ignore
            this.router.navigate(['tickets/edit/'+ticket._id]);
            return ticket;
            // return new SignUpSuccess({token: user.token, email: payload.email});
          }),
          catchError((error: any) => {
            console.log(error);
            this.router.navigate(['/login']);
            localStorage.removeItem('user');
            return of({
              type: AuthActions.LogOut
            })
          })
        );
    })
    );


  @Effect()
  ticketStore = this.actions$
    .ofType(TicketActions.SET_TICKET)
    .pipe(switchMap((action: TicketActions.SetTicket) => {
      return this.ticketsService.createTicket(action.payload)
        .pipe(
          map((tickets) => {
            console.log("ticketstickets: ", tickets);
            return {
              type: TicketActions.FETCH_TICKETS
            };
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/login'])
            localStorage.removeItem('user')
            return error;
          })
        );
    }));

  @Effect()
  updateTicketStore = this.actions$
    .ofType(TicketActions.UPDATE_TICKET)
    .pipe(switchMap((action: TicketActions.UpdateTicket) => {
      return this.ticketsService.updateTicket(action.payload.ticket)
        .pipe(
          map((tickets) => {
            console.log("ticketstickets: ", tickets);
            return {
              type: TicketActions.FETCH_TICKETS
            };
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/login'])
            localStorage.removeItem('user')
            return error;
          })
        );
    }));

  @Effect({dispatch: false})
  ticketDelete = this.actions$
    .ofType(TicketActions.DELETE_TICKET)
    .pipe(switchMap((action: TicketActions.DeleteRow) => {
      return this.ticketsService.deleteTicket(action.payload.ticket)
        .pipe(
          map((tickets) => {
            console.log("ticketstickets: ", tickets);
          }),
          catchError((error) => {
            console.log(error);
            this.router.navigate(['/login']);
            localStorage.removeItem('user');
            return (error);
          })
        );
    }));

  constructor(
    private actions$: Actions,
    private store: Store<fromTicket.FeatureState>,
    private ticketsService: TicketsService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
