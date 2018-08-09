import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {switchMap, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';

// import * as RecipeActions from '../store/recipe.actions';
import * as fromTicket from './ticket.reducers';
import {Store} from '@ngrx/store';
import * as TicketActions from './ticket.actions';
import {Ticket} from "../ticket.model";

@Injectable()
export class TicketEffects {
  // @Effect({dispatch: false})
  @Effect()
  ticketFetch = this.actions$
    .ofType(TicketActions.FETCH_TICKETS)
    .pipe(switchMap((action: TicketActions.FetchTickets) => {
      console.log('FETCH_TICKETS: ',action)
      return this.httpClient.get<Ticket[]>('http://localhost:3000/tickets', {
        observe: 'body',
        responseType: 'json'
      })
    })
    // );
      , map(
        (tickets) => {
          console.log(tickets)
          // for (let recipe of recipes) {
          //   if (!recipe['ingredients']) {
          //     recipe['ingredients'] = [];
          //   }
          // }
          return {
            type: TicketActions.SET_TICKETS,
            payload: tickets
          };
        }
      ));


  @Effect()
  ticketStore = this.actions$
    .ofType(TicketActions.SET_TICKET)
    .pipe(switchMap((action: TicketActions.SetTicket) => {
      const req = new HttpRequest(
        'POST',
        'http://localhost:3000/tickets',
        action.payload,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    }) , map(
      () => {
        return {
          type: TicketActions.FETCH_TICKETS
        };
      }
    ));

  @Effect({dispatch: false})
  ticketDelete = this.actions$
    .ofType(TicketActions.DELETE_TICKET)
    .pipe(switchMap((action: TicketActions.DeleteRow) => {
      const req = new HttpRequest(
        'DELETE',
        'http://localhost:3000/tickets',
        action.payload.ticket,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    }));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromTicket.FeatureState>
  ) {}
}
